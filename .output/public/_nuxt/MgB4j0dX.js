import{h as W,t as Z,v as K,w as O,d as tt,y as ot,_ as et}from"./CROQAHWv.js";const it=W({__name:"DiwaliLanterns",setup(at){const g=ot(null);let X=[],D=[];return Z(()=>{if(!g.value)return;const F=window.innerHeight,R=[{light:"#ffe566",mid:"#f5a800",dark:"#c06000",fold:"#d97000",glow:"#fff3a0"},{light:"#ff8fc8",mid:"#e8359a",dark:"#8b1560",fold:"#c42080",glow:"#ffcce8"},{light:"#80eaff",mid:"#0bbcd4",dark:"#006080",fold:"#0990a8",glow:"#ccf7ff"},{light:"#a0ff90",mid:"#28c840",dark:"#0a6020",fold:"#18a030",glow:"#d0ffcc"},{light:"#c8a0ff",mid:"#8040e0",dark:"#3a1080",fold:"#6828c0",glow:"#e8d8ff"},{light:"#ff9f70",mid:"#f05020",dark:"#801000",fold:"#d03010",glow:"#ffd0b0"},{light:"#fffbe0",mid:"#e8e0a0",dark:"#908040",fold:"#c0b860",glow:"#ffffff"}];function I(e,i,c,t){const r=e/2,p=e*.78,d=e*.52,$=i*.06,a=i*.7,l=r-p/2,m=r+p/2,x=r-d/2,h=r+d/2,k=[1,2,3].map(M=>({tx:l+p*(M/4),bx:x+d*(M/4)})).map(M=>`<line x1="${M.tx}" y1="${$}" x2="${M.bx}" y2="${a}" stroke="${t.fold}" stroke-width="1.4" opacity="0.5"/>`).join(""),o="u"+Math.floor(Math.random()*999999),w=a+i*.1,n=r,s=22*c,f=9*c,b=w+f*.5,v=s*.48,T=f*.44,Y=n-v*1.05,C=b,E=n+v*1.05,z=b-f*.06,A=n-s*.04,L=b-T*.9,N=n,j=b+T*.72,u=n+s*.04,U=L+f*.04,G=L-f*.1,y=8*c,B=3*c,Q=G-y*.55,V=(.3+Math.random()*.25).toFixed(2);return`<svg width="${e}" height="${i}" viewBox="0 0 ${e} ${i}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
    <defs>
      <radialGradient id="bg${o}" cx="35%" cy="35%" r="70%">
        <stop offset="0%" stop-color="${t.light}"/>
        <stop offset="55%" stop-color="${t.mid}"/>
        <stop offset="100%" stop-color="${t.dark}"/>
      </radialGradient>
      <radialGradient id="gg${o}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="white" stop-opacity="0.95"/>
        <stop offset="38%" stop-color="${t.glow}" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="${t.mid}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="ig${o}" cx="50%" cy="70%" r="55%">
        <stop offset="0%" stop-color="${t.glow}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${t.mid}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="diyaGrad${o}" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#e8935a"/>
        <stop offset="60%" stop-color="#c1622a"/>
        <stop offset="100%" stop-color="#8b3a10"/>
      </radialGradient>
      <radialGradient id="diyaPool${o}" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#ffdd88" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#c1622a" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="flameGlow${o}" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stop-color="#fff8c0" stop-opacity="0.9"/>
        <stop offset="55%" stop-color="#ffaa00" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#ff6600" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect x="${r-p/2*.6}" y="${i*.01}" width="${p*.6}" height="${i*.052}" rx="2" fill="${t.dark}" opacity="0.9"/>
    <ellipse cx="${r}" cy="${$}" rx="${p/2}" ry="${i*.028}" fill="${t.mid}" opacity="0.95"/>
    <polygon points="${l},${$} ${m},${$} ${h},${a} ${x},${a}" fill="url(#bg${o})"/>
    <polygon points="${l},${$} ${m},${$} ${h},${a} ${x},${a}" fill="url(#ig${o})"/>
    ${k}
    <ellipse cx="${r}" cy="${a}" rx="${d/2}" ry="${i*.019}" fill="${t.dark}" opacity="0.85"/>
    <ellipse cx="${r}" cy="${a-1}" rx="${d*.38}" ry="${i*.048}" fill="url(#gg${o})" opacity="0.95"/>
    <line x1="${x+d*.2}" y1="${a}" x2="${Y+v*.35}" y2="${w}" stroke="#b05500" stroke-width="${1.1*c}" opacity="0.85"/>
    <line x1="${h-d*.2}" y1="${a}" x2="${E-v*.35}" y2="${w}" stroke="#b05500" stroke-width="${1.1*c}" opacity="0.85"/>
    <line x1="${r}" y1="${a}" x2="${n}" y2="${w}" stroke="#b05500" stroke-width="${.8*c}" opacity="0.6"/>
    <path d="M${Y},${C} Q${A},${L} ${E},${z} Q${N},${j} ${Y},${C} Z" fill="url(#diyaGrad${o})"/>
    <ellipse cx="${n+s*.03}" cy="${b-T*.15}" rx="${v*.52}" ry="${T*.36}" fill="url(#diyaPool${o})"/>
    <path d="M${Y+s*.07},${C-f*.06} Q${A},${L+f*.05} ${E-s*.07},${z}" fill="none" stroke="#e8935a" stroke-width="${.65*c}" opacity="0.55"/>
    <line x1="${u}" y1="${U}" x2="${u}" y2="${G}" stroke="#3a1a08" stroke-width="${.85*c}" opacity="0.95"/>
    <ellipse cx="${u}" cy="${Q+y*.2}" rx="${B*3}" ry="${y*1.3}" fill="url(#flameGlow${o})" opacity="0.88"/>
    <g class="diya-flame" style="animation-duration:${V}s;transform-origin:${u}px ${G}px">
      <ellipse cx="${u}" cy="${Q}" rx="${B}" ry="${y}" fill="#ff8c00" opacity="0.96"/>
      <ellipse cx="${u}" cy="${G-y*.32}" rx="${B*.55}" ry="${y*.55}" fill="#ffdd33" opacity="0.97"/>
      <ellipse cx="${u}" cy="${G-y*.18}" rx="${B*.24}" ry="${y*.24}" fill="white" opacity="0.95"/>
    </g>
  </svg>`}const H=[{w:110,h:145,s:1},{w:80,h:106,s:.75},{w:60,h:80,s:.58},{w:45,h:60,s:.44},{w:35,h:46,s:.34}];let _=[];function J(){_.length===R.length&&(_=[]);let e;do e=Math.floor(Math.random()*R.length);while(_.includes(e));return _.push(e),R[e]}function P(e){if(!g.value)return;const i=Math.floor(Math.random()*H.length),{w:c,h:t,s:r}=H[i],p=J(),d=(13+Math.random()*10+i*2)*1e3,$=2.5+Math.random()*2,a=3+Math.random()*88,l=document.createElement("div");l.className="lantern-wrap",l.style.cssText=`left:${a}%;bottom:-${t+50}px;opacity:0;z-index:5;`;const m=document.createElement("div");m.className="sway",m.style.cssText=`animation-duration:${$}s;animation-delay:${-Math.random()*$}s;`,m.innerHTML=I(c,t,r,p),l.appendChild(m),g.value?.appendChild(l);const x=F+t*2+50,h=(F*.72+t+10)/x,S=window.setTimeout(()=>{let k=null,o;function w(n){if(!g.value)return;k||(k=n);const s=(n-k)/d;if(s>=1){l.remove(),P(0);return}l.style.bottom=-(t+50)+s*x+"px",l.style.opacity=s<.01?(s/.01).toString():"1";let f=1;s>h&&(f=Math.max(0,1-(s-h)/(1-h))),l.style.opacity=f.toString(),o=requestAnimationFrame(w),X.push(o)}o=requestAnimationFrame(w),X.push(o)},e);D.push(S)}for(let e=0;e<3;e++)P(e*1800)}),K(()=>{X.forEach(cancelAnimationFrame),D.forEach(clearTimeout)}),(q,F)=>(O(),tt("div",{id:"sky",ref_key:"skyRef",ref:g,class:"diwali-sky fixed inset-0 pointer-events-none z-[1]"},null,512))}}),rt=et(it,[["__scopeId","data-v-dd9e4aca"]]);export{rt as default};
