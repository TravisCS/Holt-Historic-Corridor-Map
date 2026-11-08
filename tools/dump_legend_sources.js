// Body of a WebKit harness test: dumps every legend row's label and source keys, and card links per source key, to JSON.
// Run: harness http://127.0.0.1:PORT/map.html#all tools/dump_legend_sources.js --width 1280 --height 800 --desktop-ua > tools/legend_sources.json
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let m;for(let i=0;i<150;i++){try{m=(0,eval)("typeof map!=='undefined'?map:null");}catch(e){}if(m&&m._loaded&&document.querySelector('[data-mli]'))break;await sleep(200);}
await sleep(1500);const E=s=>(0,eval)(s);const INFO=E('INFO');const infoOf=id=>{const x=INFO[id];return typeof x==='function'?x():(x||null);};
const ids=[...new Set([...document.querySelectorAll('[data-mli]')].map(b=>b.getAttribute('data-mli')))];
const rows=ids.map(id=>{let x=infoOf(id);if(typeof x==='function')x=x();return {id,label:(x&&x.label)||'',src:(x&&x.src)||[]};});
// card source keys used, by card type: collect srcKey over all record links
const srcKey=E('srcKey');const cards={};
const add=(t,u)=>{const k=srcKey(u);if(k){cards[k]=cards[k]||{};cards[k][t]=(cards[k][t]||0)+1;}};
E('ONTH').forEach(h=>(h.src||[]).forEach(s=>add('Ontario hotel cards',s.u)));E('NHH').forEach(h=>(h.src||[]).forEach(s=>add('neighbor-city hotel cards',s.u)));
E('POM').forEach(h=>(h.src||[]).forEach(s=>add('Pomona asset cards',s.u)));E('ONTA').forEach(h=>(h.src||[]).forEach(s=>add('Ontario asset cards',s.u)));
E('BZ').forEach(h=>(h.src||[]).forEach(s=>add('downtown Ontario place cards',s.u)));
const FPX=E('FP');[...FPX.areas,...FPX.points].forEach(h=>[...(h.src||[]),h.web?{u:h.web}:null].filter(Boolean).forEach(s=>add('Fairplex campus cards',s.u)));
const TRX=E('TR');[...(TRX.stations||[]),...(TRX.gaps||[]),TRX.wvc||{}].forEach(h=>(h.src||[]).forEach(s=>add('transit cards',s.u)));
const HS=(0,eval)('typeof HSR_SRC!=="undefined"?HSR_SRC:{}');Object.values(HS).forEach(v=>(v||[]).forEach(s=>add('high-speed rail cards',s.u)));
return {rows,cards,n:ids.length};
