/* LIMMA COUNTY — site interactions (cursor, reveal, video, counter). External file = WordPress cannot corrupt or strip it. */
(function(){function LIMMA_INIT(){

(function(){
  var pl=document.getElementById('pl'),gone=false;
  if(!pl)return;
  function done(){if(gone)return;gone=true;pl.classList.add('done');setTimeout(function(){if(pl&&pl.parentNode)pl.parentNode.removeChild(pl);},900);}
  window.addEventListener('load',function(){setTimeout(done,400);});
  setTimeout(done,2500); // hard safety — never trap the user behind the loader
})();



/* ══ PARTICLES ══ */
(function(){
  const c=document.getElementById('pts');
  for(let i=0;i<22;i++){
    const p=document.createElement('div');p.className='pt';
    const s=Math.random()*4+1;
    p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;--d:${(Math.random()-.5)*90}px;animation-duration:${Math.random()*13+8}s;animation-delay:${Math.random()*13}s;opacity:${Math.random()*.32+.07}`;
    c.appendChild(p);
  }
})();

/* ══ TYPEWRITER ══ */
(function(){
  const el=document.getElementById('eyb');
  const phrases=['Welcome to the Frontier','Carve Your Legacy','1899 — South Africa','The Frontier Calls'];
  let pi=0,ci=0,del=false;
  function t(){
    const w=phrases[pi];
    el.textContent=del?w.slice(0,ci--):w.slice(0,ci++);
    if(!del&&ci>w.length){del=true;setTimeout(t,1700);return}
    if(del&&ci<0){del=false;pi=(pi+1)%phrases.length;setTimeout(t,380);return}
    setTimeout(t,del?28:52);
  }
  setTimeout(t,800);
})();

/* ══ PARALLAX hero bg (image + video) ══ */
(function(){
  const layers=[document.getElementById('hbgImg'),document.getElementById('hbgVid')].filter(Boolean);
  if(!layers.length)return;
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(!ticking){
      requestAnimationFrame(()=>{
        if(scrollY<innerHeight*1.2){
          const y=scrollY*.28;
          layers.forEach(l=>{l.style.transform=`scale(1.12) translateY(${y}px)`;});
        }
        ticking=false;
      });
      ticking=true;
    }
  },{passive:true});
})();

/* ══ HERO VIDEO — show ONLY when actually playing ══
   The poster image (.hbg-img) is the base layer. We only fade the video in
   once it is genuinely playing, so a blocked/stalled video can never cover
   the background with a black frame. If autoplay is blocked, the first user
   interaction kicks it off. */
(function(){
  const v=document.getElementById('hbgVid');
  if(!v)return;
  v.addEventListener('playing',()=>v.classList.add('ready'));
  v.addEventListener('pause',()=>v.classList.remove('ready'));
  function tryPlay(){ const p=v.play&&v.play(); if(p&&p.catch)p.catch(()=>{}); }
  tryPlay();
  // Retry on the first interaction in case the browser blocked muted autoplay
  ['pointerdown','keydown','scroll','touchstart'].forEach(ev=>
    window.addEventListener(ev,tryPlay,{once:true,passive:true}));
})();

/* ══ COUNTERS ══ */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting||e.target.dataset.done)return;
      e.target.dataset.done='1';
      const to=parseInt(e.target.dataset.to),sf=e.target.dataset.sf||'';
      const from=to>200?to-80:0,dur=1400,t0=performance.now();
      (function tick(now){
        const p=Math.min((now-t0)/dur,1);
        e.target.textContent=Math.round(from+(to-from)*(1-Math.pow(1-p,3)))+sf;
        if(p<1)requestAnimationFrame(tick);
      })(t0);
    });
  },{threshold:.5});
  document.querySelectorAll('.stn[data-to]').forEach(c=>obs.observe(c));
})();

/* ══ ACTIVE NAV ══ */
(function(){
  const links=document.querySelectorAll('.nli');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting)
        links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));
    });
  },{threshold:.3});
  document.querySelectorAll('section[id]').forEach(s=>obs.observe(s));
})();

/* ══ STICKY NAV ══ */
window.addEventListener('scroll',()=>{
  const h=document.getElementById('hdr'),s=scrollY>50;
  h.style.borderBottomColor=s?'rgba(255,59,31,.28)':'rgba(255,255,255,.06)';
  h.style.boxShadow=s?'0 1px 24px rgba(192,57,43,.16)':'none';
},{passive:true});

/* ══ MOBILE MENU ══ */
const bgBtn=document.getElementById('bg'),mm=document.getElementById('mm');
bgBtn.addEventListener('click',()=>{
  const open=mm.classList.contains('show');
  bgBtn.classList.toggle('o');
  if(open){mm.classList.remove('vis');setTimeout(()=>mm.classList.remove('show'),400)}
  else{mm.classList.add('show');requestAnimationFrame(()=>mm.classList.add('vis'))}
});
function cm(){bgBtn.classList.remove('o');mm.classList.remove('vis');setTimeout(()=>mm.classList.remove('show'),400)}

/* ══ LIGHTBOX ══ */
(function(){
  const lb=document.getElementById('lb'),img=document.getElementById('lbi');
  const items=[...document.querySelectorAll('.gi')];
  let idx=0;
  const inIframe=window.self!==window.top;
  function open(i){
    idx=i;
    const src=items[i].querySelector('img').src;
    if(inIframe){window.open(src,'_blank');return}
    img.src=src;lb.classList.add('open');document.body.style.overflow='hidden';
  }
  function close(){lb.classList.remove('open');document.body.style.overflow='';setTimeout(()=>img.src='',350)}
  function nav(d){idx=(idx+d+items.length)%items.length;img.style.opacity='0';setTimeout(()=>{img.src=items[idx].querySelector('img').src;img.style.opacity='1'},150)}
  items.forEach((el,i)=>el.addEventListener('click',()=>open(i)));
  document.getElementById('lbc').addEventListener('click',close);
  document.getElementById('lpv').addEventListener('click',e=>{e.stopPropagation();nav(-1)});
  document.getElementById('lnx').addEventListener('click',e=>{e.stopPropagation();nav(1)});
  lb.addEventListener('click',e=>{if(e.target===lb)close()});
  document.addEventListener('keydown',e=>{
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')nav(-1);
    if(e.key==='ArrowRight')nav(1);
  });
  img.style.transition='opacity .15s';
})();

/* ══ DIVIDER GLOW ══ */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>e.target.classList.toggle('lit',e.isIntersecting));
  },{threshold:.5});
  document.querySelectorAll('.sdiv').forEach(d=>obs.observe(d));
})();

/* ══ SCROLL REVEAL — STAGGERED FLOAT-IN ══
   Strategy:
   1. All .rv elements start FULLY VISIBLE (CSS default) — nothing can stay hidden.
   2. JS adds rv-init (hidden) then reveals each element as it scrolls into view,
      so sections genuinely float in on scroll instead of all at once.
   3. Siblings inside the same container get an incremental delay → cards cascade.
   4. Safety net ONLY fires if IntersectionObserver never works (restricted iframe);
      once IO fires even once, we trust it and cancel the blanket fallback.
══ */
(function(){
  if(!('IntersectionObserver' in window)) return;

  const els = [...document.querySelectorAll('.rv, .rv-l, .rv-r')];
  if(!els.length) return;

  // Group siblings so grid items (cards, steps, timeline) cascade in sequence
  const groups = new Map();
  els.forEach(el => {
    const p = el.parentElement;
    if(!groups.has(p)) groups.set(p, []);
    groups.get(p).push(el);
  });
  groups.forEach(arr => {
    if(arr.length > 1) arr.forEach((el,i) => { el._sd = Math.min(i * 90, 540); });
  });

  let ioFired = false;

  // Fallback: reveal everything only if IO never fires within 1.4s
  const safetyTimer = setTimeout(() => {
    if(ioFired) return;
    els.forEach(el => { el.classList.remove('rv-init'); el.classList.add('rv-in'); });
  }, 1400);

  requestAnimationFrame(() => {
    els.forEach(el => el.classList.add('rv-init'));

    const obs = new IntersectionObserver((entries) => {
      ioFired = true;
      clearTimeout(safetyTimer);
      entries.forEach(e => {
        const el = e.target;
        if (e.isIntersecting) {
          // stagger siblings, then reveal
          el.style.transitionDelay = el._sd ? el._sd + 'ms' : '';
          el.classList.add('rv-in');
        } else {
          // reset when it leaves the viewport so it animates again on the next pass
          el.style.transitionDelay = '';
          el.classList.remove('rv-in');
        }
      });
    }, {threshold: 0.15, rootMargin: '0px 0px -80px 0px'});

    els.forEach(el => obs.observe(el));
  });
})();

/* ══ CUSTOM CURSOR — FIXED ══
   Removed coarse-pointer early exit so it works on all devices.
   Uses body.cursor-active class to hide native cursor.
   Cursor elements are hidden off-screen until first mouse move.
══ */
(function(){
  const dot = document.getElementById('cDot');
  const ring = document.getElementById('cRing');
  if(!dot || !ring) return;

  // Only activate on devices that actually have a mouse
  // We detect by first mousemove — touch devices don't fire real mousemove
  let mx = -400, my = -400;
  let rx = -400, ry = -400;
  let sparkT = 0;
  let activated = false;
  let rafId = null;

  function loop() {
    rx += (mx - rx) * 0.115;
    ry += (my - ry) * 0.115;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    rafId = requestAnimationFrame(loop);
  }
  rafId = requestAnimationFrame(loop);

  function activate() {
    if (activated) return;
    activated = true;
    document.body.classList.add('cursor-active');
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  }

  // Hide until activated
  dot.style.opacity = '0';
  ring.style.opacity = '0';
  dot.style.transition = 'opacity .3s, width .12s, height .12s';
  ring.style.transition = 'opacity .3s, width .2s ease, height .2s ease, border-color .2s, box-shadow .2s, background .2s';

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    activate();

    // Spark trail throttled to 55ms
    const now = Date.now();
    if (now - sparkT > 55) {
      sparkT = now;
      const s = document.createElement('div');
      s.className = 'spark';
      const sz = Math.random() * 3 + 1.2;
      const a  = Math.random() * Math.PI * 2;
      const d  = Math.random() * 20 + 5;
      const col = Math.random() > .5 ? 'rgba(255,59,31,.7)' : 'rgba(232,160,32,.65)';
      s.style.cssText =
        `left:${mx}px;top:${my}px;width:${sz}px;height:${sz}px;` +
        `--tx:${Math.cos(a)*d}px;--ty:${Math.sin(a)*d}px;` +
        `margin-left:-${sz/2}px;margin-top:-${sz/2}px;background:${col}`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 520);
    }
  }, {passive: true});

  // Hover enlargement
  function addHover(el) {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  }
  document.querySelectorAll('a,button,.gi,.fc,.jc,.rc').forEach(addHover);

  // Click pulse
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
    document.body.classList.remove('cursor-hover');
    dot.style.width = '3px';
    dot.style.height = '3px';
  });
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
    dot.style.width = '6px';
    dot.style.height = '6px';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (activated) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });
})();
/* LIVE DISCORD ONLINE COUNT — direct fetch
   Discord's widget.json sends "Access-Control-Allow-Origin: *", so the browser
   can read it directly. No proxy needed.
   REQUIRES: Discord → Server Settings → Widget → "Enable Server Widget" = ON. */
const DISCORD_GUILD_ID = '1353494631383564338';
async function updateOnlineCount() {
  const el = document.getElementById('online-count');
  if (!el) return;
  try {
    const res = await fetch('https://discord.com/api/guilds/' + DISCORD_GUILD_ID + '/widget.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('widget ' + res.status);
    const data = await res.json();
    if (typeof data.presence_count === 'number') {
      el.textContent = data.presence_count + '+';
      el.style.color = '#E74C3C';
    } else {
      el.textContent = '—';
    }
  } catch (e) {
    // Most common cause: the Server Widget is disabled in Discord settings.
    el.textContent = '—';
  }
}
updateOnlineCount();
setInterval(updateOnlineCount, 30000);
/* ══ ANTI-CASUAL-COPY DETERRENTS ══
   IMPORTANT: these only stop non-technical users. Anything the browser loads
   can still be recovered (view-source, curl, disabling JS, the Network tab),
   so there is no real secret to protect here — these are deterrents only. */
(function() {
  // Right-click menu off
  document.addEventListener('contextmenu', e => e.preventDefault());

  // Block drag-to-save of images / logo
  document.addEventListener('dragstart', e => e.preventDefault());

  // Block view-source / save-page / print / devtools shortcuts
  document.addEventListener('keydown', e => {
    const k = (e.key || '').toLowerCase();
    if (e.ctrlKey && (k === 'u' || k === 's' || k === 'p')) { e.preventDefault(); return false; }
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (k === 'i' || k === 'c' || k === 'j'))) { e.preventDefault(); return false; }
  });

  // DevTools heuristic — blur while a docked panel is open, restore when closed
  // (reversible + higher threshold to avoid false positives on narrow windows)
  setInterval(() => {
    const open = (window.outerWidth - window.innerWidth > 220) || (window.outerHeight - window.innerHeight > 220);
    document.body.style.filter = open ? 'blur(9px) brightness(.4)' : '';
  }, 800);

  console.log('%cLIMMA COUNTY — content protected', 'color:#E74C3C; font-family:Cinzel; font-size:13px');
})();

/* ══════════════ ENHANCEMENTS ══════════════ */

/* ══ SCROLL PROGRESS ══ */
(function(){
  const bar=document.getElementById('sprog');
  if(!bar)return;
  function upd(){
    const h=document.documentElement;
    const max=h.scrollHeight-h.clientHeight;
    bar.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';
  }
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd,{passive:true});
  upd();
})();

/* ══ HERO CURSOR SPOTLIGHT ══ */
(function(){
  const hero=document.getElementById('hero-section');
  if(!hero||matchMedia('(hover:none)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const spot=document.createElement('div');
  spot.className='hspot';
  hero.appendChild(spot);
  hero.addEventListener('mousemove',e=>{
    const r=hero.getBoundingClientRect();
    spot.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');
    spot.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    spot.style.opacity='1';
  },{passive:true});
  hero.addEventListener('mouseleave',()=>{spot.style.opacity='0';});
})();

/* ══ MAGNETIC BUTTONS ══ */
(function(){
  if(matchMedia('(hover:none)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const str=0.3;
  document.querySelectorAll('.bp,.bo,.ncta,.mmcta').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*str;
      const y=(e.clientY-r.top-r.height/2)*str;
      btn.style.transform=`translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
  });
})();

/* ══ 3D TILT CARDS ══ */
(function(){
  if(matchMedia('(hover:none)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const max=7;
  document.querySelectorAll('.fc,.jc').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-0.5;
      const py=(e.clientY-r.top)/r.height-0.5;
      card.style.transform=`perspective(900px) rotateY(${px*max}deg) rotateX(${-py*max}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });
})();



try{window.cm=cm;}catch(e){}

}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",LIMMA_INIT);else LIMMA_INIT();})();
