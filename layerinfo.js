/* layerinfo.js: a "+" button on each legend row that opens a panel saying where the layer
   comes from (publisher, dataset, date, link), what it is, why it matters and what to watch,
   plus a Sources block for map cards. Drop-in, no dependencies; CSS is injected.
   Usage:
     var LI = MapLayerInfo.attach({
       legend: '#legend',                 // container the rows live in (clicks are delegated here)
       rows: 'label[data-layer]',         // rows that get a + (omit when the map writes buttons itself
                                          //   with MapLayerInfo.buttonHTML(id, label))
       idOf: function(row){return row.dataset.layer},        // optional
       labelOf: function(row){return row.textContent.trim()}, // optional
       info: { layerId: {kind:'official', src:['source_name'], mix:'...', what:'...', why:'...', care:'...'} },
       sources: [ {name, owner, title, year, url, retrieved, use} ],   // array or {name: {...}}
       isOn: function(id){...}, toggle: function(id){...},   // optional: adds "Turn this layer on/off"
       about: function(){...},            // optional: adds "All sources" (open the map's About sheet)
       pdf: 'Map_Sources.pdf',            // optional: adds a "Source list (PDF)" download (or {href, label})
       anchor: '#legend',                 // optional: the panel opens beside this box (default: legend)
       map: leafletMap                    // optional: on phones a map tap closes the panel
     });
     card HTML: MapLayerInfo.list().add('source_name','what it gave',[extraLinkHtml]).html({note:'...'})
   Written for the LA County Evacuation Routes map (T. C. Smith, 2026). */
(function(){
'use strict';
var KINDS={
 official:['Official designation','An agency designated these. The map shows that agency\'s own layer.','ok'],
 agency:['Agency data','From a public agency\'s own records or inventory.','ok'],
 mixed:['Agency records plus OpenStreetMap','Agency lists back most of it; volunteer mapping fills in the rest.',''],
 osm:['Volunteer-mapped','From OpenStreetMap, the free map anyone can edit. Wide coverage, but no agency checks it.',''],
 research:['Researched for this map','Gathered by hand or by research agents from the sources listed, each checked against its source.',''],
 inferred:['Inferred by this map','No agency publishes this. The map guesses it from location, so treat it as a lead, not a fact.','warn'],
 computed:['Worked out by this map','Calculated by this map from the sources listed here.',''],
 plans:['Read from emergency plans','Taken from the text of official emergency plans by Claude agents, each with its page and a quote.',''],
 unverified:['Unverified','Only one source shows these and nothing confirms them.','warn']};
var CSS='.mli-w{display:flex;align-items:center;gap:3px}.mli-w>:first-child{flex:1;min-width:0}'+
 '.mli-b{flex:none;width:22px;height:22px;margin:0 1px 0 4px;border-radius:50%;border:1px solid var(--rule,#c9c3b2);background:var(--panel,#fff);color:var(--ink,#1d1c19);font:700 15px/1 var(--serif,Georgia,serif);padding:0;cursor:pointer;display:inline-grid;place-items:center;vertical-align:middle}'+
 '@media (hover:hover){.mli-b:hover{background:var(--chip,rgba(127,127,127,.15));border-color:var(--muted,#888)}}'+
 '.mli-b.on{background:var(--accent,#b8322f);border-color:var(--accent,#b8322f);color:#fff}.mli-b:focus-visible{outline:2px solid var(--accent,#b8322f);outline-offset:1px}'+
 '@media (pointer:coarse){.mli-b{width:30px;height:30px;font-size:17px}}'+
 '#mli-panel{position:fixed;z-index:1000;box-sizing:border-box;overflow:auto;overscroll-behavior:contain;padding:12px 15px 14px;font-family:var(--serif,Georgia,serif);font-size:14.5px;line-height:1.45;background:var(--panel,#fbf9f3);color:var(--ink,#1d1c19);border:1px solid var(--rule,#d9d4c4);border-left:4px solid var(--accent,#b8322f);border-radius:8px;box-shadow:var(--shadow,0 2px 10px rgba(0,0,0,.28));max-width:calc(100vw - 20px)}'+
 '#mli-panel[hidden]{display:none}#mli-panel .mli-h{display:flex;align-items:flex-start;gap:8px}#mli-panel h3{flex:1;min-width:0;margin:0;font-size:17px;line-height:1.25;text-wrap:balance}'+
 '#mli-panel .mli-x{flex:none;font:20px/1 var(--serif,Georgia,serif);padding:1px 9px 3px;border-radius:6px;border:1px solid var(--rule,#d9d4c4);background:var(--chip,rgba(127,127,127,.15));color:inherit;cursor:pointer}'+
 '#mli-panel h4{margin:12px 0 3px;font-size:12.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted,#6b6659)}#mli-panel p{margin:0 0 4px}'+
 '#mli-panel .mli-k{margin:8px 0 0;padding:6px 9px;border-radius:6px;background:var(--chip,rgba(127,127,127,.15));font-size:13.5px;line-height:1.35}'+
 '#mli-panel .mli-k.ok{background:rgba(46,125,50,.17)}#mli-panel .mli-k.warn{background:rgba(214,150,0,.24)}'+
 '#mli-panel .mli-srcl{margin:6px 0 2px;padding-left:20px}#mli-panel .mli-srcl li{margin:0 0 7px;font-size:13.5px;line-height:1.4;overflow-wrap:anywhere}'+
 '#mli-panel .mli-g,#mli-panel .mli-m{color:var(--muted,#6b6659)}#mli-panel .mli-m{font-size:12.5px}#mli-panel a{color:var(--link,#1f4e79)}'+
 '#mli-panel .mli-btns{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}#mli-panel .mli-btns button,#mli-panel .mli-btns a{font:inherit;font-size:13.5px;line-height:1.3;padding:4px 10px;border-radius:6px;border:1px solid var(--rule,#d9d4c4);background:var(--chip,rgba(127,127,127,.15));color:inherit;cursor:pointer;text-decoration:none}'+
 '.mli-srcs>summary{font-weight:700;cursor:pointer}.mli-srcl{margin:4px 0 2px;padding-left:18px;font-size:.82em;line-height:1.38}.mli-srcl li{margin:0 0 5px;overflow-wrap:anywhere}.mli-srcl .mli-g,.mli-srcs .mli-m{opacity:.78}';
var cssDone=false;function css(){if(cssDone)return;cssDone=true;var s=document.createElement('style');s.id='mli-css';s.textContent=CSS;document.head.appendChild(s)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
var MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
function dateLong(d){var m=/^(\d{4})-(\d{2})-(\d{2})/.exec(d||'');return m?MON[+m[2]-1]+' '+(+m[3])+', '+m[1]:String(d||'')}
var SRC={};
function addSources(list){if(!list)return;if(Array.isArray(list))list.forEach(function(s){if(s&&s.name)SRC[s.name]=s});else Object.keys(list).forEach(function(k){var s=list[k];if(s){if(!s.name)s.name=k;SRC[k]=s}})}
function src(n){return typeof n==='object'?n:(SRC[n]||null)}
var isFile=location.protocol==='file:';
function href(s){var u=s.url||'';if(/^https?:/i.test(u))return u;return isFile?u:''}
// one source cited: Publisher (year). Title. Used for: ... [Open the source]
function cite(s,used,links){s=src(s);if(!s)return '';var y=s.year&&s.year!=='n.d.'?s.year:'no date given',h=href(s);
 return '<b>'+esc(s.owner||s.publisher||'')+'</b> ('+esc(y)+'). <i>'+esc(s.title||s.name)+'</i>.'+(used?' <span class="mli-g">Used for: '+esc(used)+'.</span>':'')+
  ' <span class="mli-ln">'+[h?'<a href="'+esc(h)+'" target="_blank" rel="noopener">Open the source</a>':''].concat(links||[]).filter(Boolean).join(' &middot; ')+'</span>'}
// a source list for a card: add() merges what each source gave; html() returns a <details> block
function List(short){this.o=[];this.m={};this.short=short||{}}
List.prototype.add=function(n,used,link){var t=this;if(!n)return t;if(Array.isArray(n)){n.forEach(function(x){t.add(x,used,link)});return t}
 var s=src(n);if(!s)return t;var k=s.name||n,e=t.m[k];if(!e){e=t.m[k]={s:s,w:[],x:[]};t.o.push(e)}
 if(used&&e.w.indexOf(used)<0)e.w.push(used);if(link&&e.x.indexOf(link)<0)e.x.push(link);return t};
List.prototype.custom=function(key,html,short){if(!this.m[key]){var e=this.m[key]={html:html,short:short};this.o.push(e)}return this};
List.prototype.html=function(o){o=o||{};var t=this;if(!t.o.length&&!o.note)return '';var names=[];
 t.o.forEach(function(e){var n=e.short||(e.s&&(t.short[e.s.name]||e.s.short||e.s.owner));if(n&&names.indexOf(n)<0)names.push(n)});
 var sum='Sources'+(names.length?': '+names.slice(0,3).join(', ')+(names.length>3?' and '+(names.length-3)+' more':''):'');
 var open=o.open!=null?o.open:!(window.matchMedia&&matchMedia('(max-width:760px),(max-height:500px)').matches);
 var li=t.o.map(function(e){return '<li>'+(e.html||cite(e.s,e.w.join('; '),e.x))+'</li>'}).join('');
 var tail=[o.note||'',o.retrieved?'Sources downloaded '+dateLong(o.retrieved)+'.':'',o.more||''].filter(Boolean).join(' ');
 return '<details class="mli-srcs'+(o.className?' '+o.className:'')+'"'+(open?' open':'')+'><summary>'+esc(sum)+'</summary>'+(li?'<ol class="mli-srcl'+(o.listClass?' '+o.listClass:'')+'">'+li+'</ol>':'')+(tail?'<p class="mli-m'+(o.noteClass?' '+o.noteClass:'')+'">'+tail+'</p>':'')+'</details>'};
var api=null;
function buttonHTML(id,label){var on=!!(api&&api.openId===id);return '<button type="button" class="mli-b'+(on?' on':'')+'" data-mli="'+esc(id)+'" aria-expanded="'+on+'" aria-controls="mli-panel" aria-label="Where '+esc(label||id)+' comes from" title="Where it comes from, and more">'+(on?'\u2212':'+')+'</button>'}
function attach(o){css();addSources(o.sources);var lg=typeof o.legend==='string'?document.querySelector(o.legend):o.legend;
 var A=api={openId:null,o:o};var panel=null;
 var narrow=function(){return innerWidth<=760||innerHeight<=500};
 function infoOf(id){var x=typeof o.info==='function'?o.info(id):(o.info||{})[id];return x||null}
 function anchor(){var a=o.anchor?(typeof o.anchor==='string'?document.querySelector(o.anchor):o.anchor):lg;return a||lg}
 function labelFor(id){var b=lg&&lg.querySelector('[data-mli="'+cssq(id)+'"]');if(o.labelFor)return o.labelFor(id);var x=infoOf(id);if(x&&x.label)return x.label;
  if(b&&b._row)return (o.labelOf?o.labelOf(b._row):b._row.textContent.replace(/\s+/g,' ').trim());return id}
 function cssq(s){return String(s).replace(/["\\]/g,'\\$&')}
 function decorate(){if(!lg||!o.rows)return;var rows=typeof o.rows==='function'?o.rows(lg):lg.querySelectorAll(o.rows);
  Array.prototype.forEach.call(rows,function(r){if(r.__mli)return;var id=o.idOf?o.idOf(r):(r.dataset.info||r.dataset.layer||r.dataset.k||r.id);if(!id||!infoOf(id))return;r.__mli=1;
   var wrap=document.createElement('div');wrap.className='mli-w';var t=document.createElement('template');t.innerHTML=buttonHTML(id,o.labelOf?o.labelOf(r):r.textContent.replace(/\s+/g,' ').trim());var b=t.content.firstChild;b._row=r;
   if(o.insert==='inside'){r.appendChild(b)}else{r.parentNode.insertBefore(wrap,r);wrap.appendChild(r);wrap.appendChild(b)}})}
 function sync(){if(!lg)return;Array.prototype.forEach.call(lg.querySelectorAll('[data-mli]'),function(b){var on=b.dataset.mli===A.openId;if(b.classList.contains('on')!==on){b.classList.toggle('on',on);b.setAttribute('aria-expanded',String(on));b.textContent=on?'\u2212':'+'}})}
 function render(id){var x=infoOf(id),K=KINDS[x.kind]||KINDS[x.t]||['','',''];
  var h='<div class="mli-h"><h3 id="mli-h">'+esc(labelFor(id))+'</h3><button type="button" class="mli-x" data-mli-x aria-label="Close">&times;</button></div>';
  if(K[0])h+='<p class="mli-k '+K[2]+'"><b>'+esc(K[0])+'.</b> '+esc(K[1])+'</p>';
  h+='<h4>Where it comes from</h4>'+(x.mix?'<p>'+esc(x.mix)+'</p>':'')+'<ol class="mli-srcl">'+(x.src||[]).map(function(n){var s=src(n);return s?'<li>'+cite(s,s.use)+'</li>':''}).join('')+'</ol>';
  var rd=x.retrieved||o.retrieved;if(rd)h+='<p class="mli-m">Downloaded '+esc(dateLong(rd))+'.</p>';
  var what=x.what||(o.defs&&o.defs(id));if(what)h+='<h4>What it is</h4><p>'+esc(what)+'</p>';
  if(x.why)h+='<h4>Why it matters</h4><p>'+esc(x.why)+'</p>';if(x.care)h+='<h4>Before you rely on it</h4><p>'+esc(x.care)+'</p>';
  var bt='';if(o.isOn&&o.toggle)bt+='<button type="button" data-mli-t>'+(o.isOn(id)?'Turn this layer off':'Turn this layer on')+'</button>';if(o.about)bt+='<button type="button" data-mli-a>All sources</button>';if(o.pdf)bt+='<a href="'+esc(o.pdf.href||o.pdf)+'" download target="_blank" rel="noopener">'+esc(o.pdf.label||'Source list (PDF)')+'</a>';
  if(bt)h+='<div class="mli-btns">'+bt+'</div>';return h}
 function place(){if(!panel||panel.hidden)return;var a=anchor(),k=a.getBoundingClientRect();if(!k.width||(o.minClass!==false&&a.classList.contains(o.minClass||'min'))){close();return}
  var W=innerWidth,H=innerHeight,w=Math.min(o.width||400,W-20),bottom=Math.max(10,H-k.bottom),left;panel.style.width=w+'px';
  if(k.left>w+24)left=k.left-w-10;else if(W-k.right>w+24)left=k.right+10;else left=Math.max(10,Math.min(W-w-10,k.left));
  panel.style.left=Math.round(left)+'px';panel.style.bottom=Math.round(bottom)+'px';panel.style.top='';
  panel.style.maxHeight=Math.round(Math.max(160,Math.min(H*(narrow()?0.75:1)-bottom-10,H-bottom-(o.topGap!=null?o.topGap:60))))+'px'}
 function open(id){if(!infoOf(id))return;if(o.onOpen)o.onOpen(id);
  if(!panel){panel=document.createElement('div');panel.id='mli-panel';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-labelledby','mli-h');document.body.appendChild(panel);
   panel.addEventListener('click',function(e){var t=e.target;if(t.closest('[data-mli-x]')){close(true);return}
    if(t.closest('[data-mli-t]')){o.toggle(A.openId);refreshToggle();return}if(t.closest('[data-mli-a]')){close(false);o.about();}})}
  A.openId=id;panel.innerHTML=render(id);panel.hidden=false;place();panel.scrollTop=0;sync();
  var x=panel.querySelector('[data-mli-x]');if(x)try{x.focus({preventScroll:true})}catch(er){x.focus()}}
 function close(refocus){if(!panel||panel.hidden)return;var id=A.openId;panel.hidden=true;A.openId=null;sync();if(o.onClose)o.onClose(id);
  if(refocus&&lg){var b=lg.querySelector('[data-mli="'+cssq(id)+'"]');if(b)b.focus()}}
 function refreshToggle(){if(!panel||panel.hidden||!o.isOn)return;var t=panel.querySelector('[data-mli-t]');if(t)t.textContent=o.isOn(A.openId)?'Turn this layer off':'Turn this layer on'}
 if(lg){lg.addEventListener('click',function(e){var b=e.target.closest('[data-mli]');if(!b||!lg.contains(b))return;e.preventDefault();e.stopPropagation();if(A.openId===b.dataset.mli)close(true);else open(b.dataset.mli)},true);
  if(window.MutationObserver)new MutationObserver(function(){decorate();sync()}).observe(lg,{childList:true,subtree:true});}
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel&&!panel.hidden&&!(o.blockEscape&&o.blockEscape())){e.stopPropagation();close(true)}},true);
 addEventListener('resize',place);
 if(o.map&&o.map.on)o.map.on('click',function(){if(narrow())close()});
 decorate();
 A.open=open;A.close=close;A.place=place;A.decorate=decorate;A.sync=sync;A.refreshToggle=refreshToggle;
 A.isOpen=function(){return !!(panel&&!panel.hidden)};A.panel=function(){return panel};A.text=function(){return panel&&!panel.hidden?panel.innerText:''};
 return A}
window.MapLayerInfo={attach:attach,buttonHTML:buttonHTML,cite:cite,list:function(short){return new List(short)},addSources:addSources,source:src,KINDS:KINDS,dateLong:dateLong,esc:esc};
})();
