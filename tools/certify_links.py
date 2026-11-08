"""Check a list of source links today: certify_links.py <in.json> <out.json> [--browser browser_checks.json]

in.json: [{"key": "...", "url": "...", ...any other fields}]. Each item comes back with
result ("verified", "blocked", "failed", "local"), detail (one plain sentence), http, checked (date),
and for ArcGIS REST services the layer name and the publisher's last-edit date.
- ArcGIS services (/rest/services/): asks the service for its own description (?f=json).
- Other links: fetches the first 2 KB with a browser user agent (PDF, file or web page), and retries
  once with a longer wait when a slow server times out.
- Sites that refuse scripts (401/403/429/503) come back "blocked". Open those in a real browser:
  go to the site's home page and fetch the file from there with a Range header (same origin, so
  nothing downloads), then list the results in browser_checks.json as
  [{"url", "checked", "http", "result": "verified", "detail"}] and run again with --browser.
"""
import json, re, subprocess, sys, datetime, concurrent.futures as cf

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15"
TODAY = datetime.date.today().isoformat()

def curl(url, rng=True, timeout=40):
    cmd = ["curl", "-sS", "-L", "--max-time", str(timeout), "-A", UA, "-o", "-", "-w", "\n__HTTP__%{http_code}\t%{content_type}\t%{url_effective}"]
    if rng:
        cmd += ["-r", "0-2047"]
    try:
        p = subprocess.run(cmd + [url], capture_output=True, timeout=timeout + 10)
    except subprocess.TimeoutExpired:
        return "000", "", url, b"", "timed out"
    out = p.stdout; i = out.rfind(b"\n__HTTP__")
    body, tail = (out[:i], out[i + 9:].decode("latin-1")) if i >= 0 else (out, "000\t\t")
    parts = tail.split("\t", 2)  # tabs: a content type such as "text/html; charset=UTF-8" has spaces
    return parts[0], (parts[1] if len(parts) > 1 else ""), (parts[2] if len(parts) > 2 else url), body, p.stderr.decode("latin-1").strip()

def ms_date(v):
    try:
        return datetime.datetime.fromtimestamp(int(v) / 1000, datetime.timezone.utc).date().isoformat()
    except Exception:
        return None

def check(item):
    url = item.get("url") or ""
    r = dict(item); r["checked"] = TODAY
    if not url.startswith("http"):
        r.update(result="local", detail="A file kept with the project, not a web link.")
        return r
    if re.search(r"/rest/services/", url, re.I):
        code, ctype, eff, body, err = curl(url + ("&" if "?" in url else "?") + "f=json", rng=False)
        if code == "000":
            code, ctype, eff, body, err = curl(url + ("&" if "?" in url else "?") + "f=json", rng=False, timeout=90)
        r["http"] = code
        try:
            j = json.loads(body.decode("utf-8", "replace"))
        except Exception:
            j = None
        if code.startswith("2") and isinstance(j, dict) and "error" not in j:
            nm = j.get("name") or j.get("mapName") or ""
            ei = j.get("editingInfo") or {}
            r.update(result="verified", service_name=nm, last_edit=ms_date(ei.get("dataLastEditDate") or ei.get("lastEditDate")),
                     detail="The service answered with its own description" + (f" (layer “{nm}”)" if nm else "") + ".")
        else:
            msg = (j or {}).get("error", {}).get("message") if isinstance(j, dict) else (err or "no answer")
            r.update(result="failed", detail=f"HTTP {code}: {msg}")
        return r
    code, ctype, eff, body, err = curl(url)
    if code == "000":
        code, ctype, eff, body, err = curl(url, timeout=90)
    r["http"] = code; r["content_type"] = ctype
    if code in ("200", "206"):
        kind = "the PDF" if body[:4] == b"%PDF" else ("a file" if ("octet" in ctype or "zip" in ctype or url.endswith((".zip", ".pbf"))) else "a web page")
        r.update(result="verified", detail=f"The link answered with {kind} (HTTP {code}).")
    elif code in ("401", "403", "429", "503", "000"):
        r.update(result="blocked", detail=f"The site refused the automated check (HTTP {code}).")
    else:
        r.update(result="failed", detail=f"HTTP {code} {err}".strip())
    return r

def run(items, browser=None, workers=8):
    with cf.ThreadPoolExecutor(workers) as ex:
        out = list(ex.map(check, items))
    by = {b["url"]: b for b in (browser or [])}
    for r in out:
        b = by.get(r.get("url"))
        if b and r["result"] != "verified":
            r.update(result=b["result"], detail=b["detail"], http=b.get("http"), how="browser", checked=b.get("checked", TODAY))
    return out

if __name__ == "__main__":
    a = sys.argv[1:]
    br = json.load(open(a[a.index("--browser") + 1])) if "--browser" in a else None
    res = run(json.load(open(a[0])), br)
    json.dump(res, open(a[1], "w"), indent=1, ensure_ascii=False)
    from collections import Counter
    print(Counter(x["result"] for x in res))
    for x in res:
        if x["result"] not in ("verified", "local"):
            print(" ", x["result"], x.get("key"), x.get("url", "")[:100], x["detail"])
