<template>
  <div id="sky" ref="skyRef" class="diwali-sky fixed inset-0 pointer-events-none z-[1]">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const skyRef = ref<HTMLElement | null>(null);
let animationFrames: number[] = [];
let timeouts: number[] = [];

onMounted(() => {
  const sky = skyRef.value;
  if (!sky) return;
  const skyH = window.innerHeight;

  const palettes = [
    { light:'#ffe566', mid:'#f5a800', dark:'#c06000', fold:'#d97000', glow:'#fff3a0' },
    { light:'#ff8fc8', mid:'#e8359a', dark:'#8b1560', fold:'#c42080', glow:'#ffcce8' },
    { light:'#80eaff', mid:'#0bbcd4', dark:'#006080', fold:'#0990a8', glow:'#ccf7ff' },
    { light:'#a0ff90', mid:'#28c840', dark:'#0a6020', fold:'#18a030', glow:'#d0ffcc' },
    { light:'#c8a0ff', mid:'#8040e0', dark:'#3a1080', fold:'#6828c0', glow:'#e8d8ff' },
    { light:'#ff9f70', mid:'#f05020', dark:'#801000', fold:'#d03010', glow:'#ffd0b0' },
    { light:'#fffbe0', mid:'#e8e0a0', dark:'#908040', fold:'#c0b860', glow:'#ffffff' },
  ];

  function makeLanternSVG(w: number, h: number, s: number, pal: any) {
    const cx = w / 2;
    const tw = w * 0.78, bw = w * 0.52;
    const bodyTop = h * 0.06, bodyBot = h * 0.70;
    const tlx = cx - tw/2, trx = cx + tw/2;
    const blx = cx - bw/2, brx = cx + bw/2;
    const folds = [1,2,3].map(i => ({tx: tlx+tw*(i/4), bx: blx+bw*(i/4)}));
    const foldLines = folds.map(f =>
      `<line x1="${f.tx}" y1="${bodyTop}" x2="${f.bx}" y2="${bodyBot}" stroke="${pal.fold}" stroke-width="1.4" opacity="0.5"/>`
    ).join('');
    const uid = 'u'+Math.floor(Math.random()*999999);
    const wireJoinY = bodyBot + h * 0.10;
    const wireJoinX = cx;
    const dw = 22 * s, dh = 9 * s;
    const diyaCY = wireJoinY + dh * 0.5;
    const diyaRx = dw * 0.48, diyaRy = dh * 0.44;
    const dLeftX = wireJoinX - diyaRx * 1.05, dLeftY = diyaCY;
    const dRightX = wireJoinX + diyaRx * 1.05, dRightY = diyaCY - dh * 0.06;
    const dTopX = wireJoinX - dw*0.04, dTopY = diyaCY - diyaRy * 0.9;
    const dBotX = wireJoinX, dBotY = diyaCY + diyaRy * 0.72;
    const wickX = wireJoinX + dw * 0.04;
    const wickBaseY = dTopY + dh * 0.04;
    const wickTopY = dTopY - dh * 0.1;
    const fH = 8 * s, fW = 3 * s;
    const fCY = wickTopY - fH * 0.55;
    const flickerDur = (0.3 + Math.random()*0.25).toFixed(2);

    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
    <defs>
      <radialGradient id="bg${uid}" cx="35%" cy="35%" r="70%">
        <stop offset="0%" stop-color="${pal.light}"/>
        <stop offset="55%" stop-color="${pal.mid}"/>
        <stop offset="100%" stop-color="${pal.dark}"/>
      </radialGradient>
      <radialGradient id="gg${uid}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="white" stop-opacity="0.95"/>
        <stop offset="38%" stop-color="${pal.glow}" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="${pal.mid}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="ig${uid}" cx="50%" cy="70%" r="55%">
        <stop offset="0%" stop-color="${pal.glow}" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="${pal.mid}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="diyaGrad${uid}" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#e8935a"/>
        <stop offset="60%" stop-color="#c1622a"/>
        <stop offset="100%" stop-color="#8b3a10"/>
      </radialGradient>
      <radialGradient id="diyaPool${uid}" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stop-color="#ffdd88" stop-opacity="0.55"/>
        <stop offset="100%" stop-color="#c1622a" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="flameGlow${uid}" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stop-color="#fff8c0" stop-opacity="0.9"/>
        <stop offset="55%" stop-color="#ffaa00" stop-opacity="0.45"/>
        <stop offset="100%" stop-color="#ff6600" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect x="${cx-tw/2*0.6}" y="${h*0.01}" width="${tw*0.6}" height="${h*0.052}" rx="2" fill="${pal.dark}" opacity="0.9"/>
    <ellipse cx="${cx}" cy="${bodyTop}" rx="${tw/2}" ry="${h*0.028}" fill="${pal.mid}" opacity="0.95"/>
    <polygon points="${tlx},${bodyTop} ${trx},${bodyTop} ${brx},${bodyBot} ${blx},${bodyBot}" fill="url(#bg${uid})"/>
    <polygon points="${tlx},${bodyTop} ${trx},${bodyTop} ${brx},${bodyBot} ${blx},${bodyBot}" fill="url(#ig${uid})"/>
    ${foldLines}
    <ellipse cx="${cx}" cy="${bodyBot}" rx="${bw/2}" ry="${h*0.019}" fill="${pal.dark}" opacity="0.85"/>
    <ellipse cx="${cx}" cy="${bodyBot-1}" rx="${bw*0.38}" ry="${h*0.048}" fill="url(#gg${uid})" opacity="0.95"/>
    <line x1="${blx + bw*0.2}" y1="${bodyBot}" x2="${dLeftX + diyaRx*0.35}" y2="${wireJoinY}" stroke="#b05500" stroke-width="${1.1*s}" opacity="0.85"/>
    <line x1="${brx - bw*0.2}" y1="${bodyBot}" x2="${dRightX - diyaRx*0.35}" y2="${wireJoinY}" stroke="#b05500" stroke-width="${1.1*s}" opacity="0.85"/>
    <line x1="${cx}" y1="${bodyBot}" x2="${wireJoinX}" y2="${wireJoinY}" stroke="#b05500" stroke-width="${0.8*s}" opacity="0.6"/>
    <path d="M${dLeftX},${dLeftY} Q${dTopX},${dTopY} ${dRightX},${dRightY} Q${dBotX},${dBotY} ${dLeftX},${dLeftY} Z" fill="url(#diyaGrad${uid})"/>
    <ellipse cx="${wireJoinX + dw*0.03}" cy="${diyaCY - diyaRy*0.15}" rx="${diyaRx*0.52}" ry="${diyaRy*0.36}" fill="url(#diyaPool${uid})"/>
    <path d="M${dLeftX + dw*0.07},${dLeftY - dh*0.06} Q${dTopX},${dTopY + dh*0.05} ${dRightX - dw*0.07},${dRightY}" fill="none" stroke="#e8935a" stroke-width="${0.65*s}" opacity="0.55"/>
    <line x1="${wickX}" y1="${wickBaseY}" x2="${wickX}" y2="${wickTopY}" stroke="#3a1a08" stroke-width="${0.85*s}" opacity="0.95"/>
    <ellipse cx="${wickX}" cy="${fCY + fH*0.2}" rx="${fW*3}" ry="${fH*1.3}" fill="url(#flameGlow${uid})" opacity="0.88"/>
    <g class="diya-flame" style="animation-duration:${flickerDur}s;transform-origin:${wickX}px ${wickTopY}px">
      <ellipse cx="${wickX}" cy="${fCY}" rx="${fW}" ry="${fH}" fill="#ff8c00" opacity="0.96"/>
      <ellipse cx="${wickX}" cy="${wickTopY - fH*0.32}" rx="${fW*0.55}" ry="${fH*0.55}" fill="#ffdd33" opacity="0.97"/>
      <ellipse cx="${wickX}" cy="${wickTopY - fH*0.18}" rx="${fW*0.24}" ry="${fH*0.24}" fill="white" opacity="0.95"/>
    </g>
  </svg>`;
  }

  const sizes = [
    {w:110, h:145, s:1.0},
    {w:80,  h:106, s:0.75},
    {w:60,  h:80,  s:0.58},
    {w:45,  h:60,  s:0.44},
    {w:35,  h:46,  s:0.34},
  ];

  let usedPalettes: number[] = [];
  function pickPalette() {
    if (usedPalettes.length === palettes.length) usedPalettes = [];
    let idx;
    do { idx = Math.floor(Math.random() * palettes.length); } while (usedPalettes.includes(idx));
    usedPalettes.push(idx);
    return palettes[idx];
  }

  function spawnLantern(launchDelay: number) {
    if (!skyRef.value) return; // component unmounted
    const si = Math.floor(Math.random() * sizes.length);
    const {w, h, s} = sizes[si];
    const pal = pickPalette();
    const duration = (13 + Math.random()*10 + si*2) * 1000;
    const swayDur = 2.5 + Math.random()*2;
    const startX = 3 + Math.random()*88;

    const wrap = document.createElement('div');
    wrap.className = 'lantern-wrap';
    wrap.style.cssText = `left:${startX}%;bottom:-${h+50}px;opacity:0;z-index:5;`;

    const inner = document.createElement('div');
    inner.className = 'sway';
    inner.style.cssText = `animation-duration:${swayDur}s;animation-delay:${-Math.random()*swayDur}s;`;
    inner.innerHTML = makeLanternSVG(w, h, s, pal);
    wrap.appendChild(inner);
    skyRef.value?.appendChild(wrap);

    const totalTravel = skyH + h * 2 + 50;
    const fadeStartFraction = (skyH * 0.72 + h + 10) / totalTravel;

    const t = window.setTimeout(() => {
      let startTime: number | null = null;
      let frameId: number;
      function animate(ts: number) {
        if (!skyRef.value) return; // Cleanup on unmount
        if (!startTime) startTime = ts;
        const progress = (ts - startTime) / duration;

        if (progress >= 1) {
          wrap.remove();
          spawnLantern(0);
          return;
        }

        wrap.style.bottom = (-(h + 50) + progress * totalTravel) + 'px';
        wrap.style.opacity = progress < 0.01 ? (progress / 0.01).toString() : '1';

        let opacity = 1;
        if (progress > fadeStartFraction) {
          opacity = Math.max(0, 1 - (progress - fadeStartFraction) / (1 - fadeStartFraction));
        }
        wrap.style.opacity = opacity.toString();

        frameId = requestAnimationFrame(animate);
        animationFrames.push(frameId);
      }
      frameId = requestAnimationFrame(animate);
      animationFrames.push(frameId);
    }, launchDelay);
    timeouts.push(t);
  }

  for (let i = 0; i < 3; i++) {
    spawnLantern(i * 1800); // Increased delay slightly since there are fewer lanterns
  }
});

onUnmounted(() => {
  animationFrames.forEach(cancelAnimationFrame);
  timeouts.forEach(clearTimeout);
});
</script>

<style scoped>
.diwali-sky {
  overflow: hidden;
}
</style>

<style>
@keyframes sway {
  0%,100% { transform: rotate(-4deg) translateX(0px); }
  50%      { transform: rotate(4deg) translateX(14px); }
}
@keyframes twinkle {
  0%,100% { opacity: 0.85; }
  50%      { opacity: 0.15; }
}
@keyframes flameFlicker {
  0%,100% { transform: scaleY(1) scaleX(1); opacity: 1; }
  25%      { transform: scaleY(1.3) scaleX(0.78); opacity: 0.85; }
  50%      { transform: scaleY(0.85) scaleX(1.15); opacity: 0.95; }
  75%      { transform: scaleY(1.2) scaleX(0.82); opacity: 0.8; }
}

.lantern-wrap { position: absolute; pointer-events: none; }
.sway { animation: sway ease-in-out infinite; }
.diya-flame { animation: flameFlicker ease-in-out infinite; }
</style>
