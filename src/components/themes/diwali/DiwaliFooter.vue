<template>
  <div class="diwali-footer-effect w-full pointer-events-none z-10">
    <div class="diyas-row">
      <div class="diya-wrap"><div class="flame"></div><div class="diya-bowl"></div></div>
      <div class="diya-wrap"><div class="flame"></div><div class="diya-bowl"></div></div>
      <div class="diya-wrap"><div class="flame"></div><div class="diya-bowl"></div></div>
      <div class="diya-wrap"><div class="flame"></div><div class="diya-bowl"></div></div>
      <div class="diya-wrap"><div class="flame"></div><div class="diya-bowl"></div></div>
      <div class="diya-wrap"><div class="flame"></div><div class="diya-bowl"></div></div>
      <div class="diya-wrap"><div class="flame"></div><div class="diya-bowl"></div></div>
    </div>

    <div class="baluster-wrap">
      <div class="baluster-top-bar"></div>
      <div class="lights-strip">
        <svg viewBox="0 0 1200 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bg-diwali" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stop-color="#fffbe0"/>
              <stop offset="35%" stop-color="#f8c030"/>
              <stop offset="100%" stop-color="#e07810" stop-opacity="0"/>
            </radialGradient>
            <filter id="glow-diwali" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path d="M0,8 Q50,36 100,14 Q150,40 200,14 Q250,40 300,14 Q350,40 400,14 Q450,40 500,14 Q550,40 600,14 Q650,40 700,14 Q750,40 800,14 Q850,40 900,14 Q950,40 1000,14 Q1050,40 1100,14 Q1150,40 1200,14"
                fill="none" stroke="rgba(160,80,220,0.4)" stroke-width="1.8"/>
          <g filter="url(#glow-diwali)">
            <circle class="bulb" cx="50"   cy="36" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="150"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="250"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="350"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="450"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="550"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="650"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="750"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="850"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="950"  cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="1050" cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="1150" cy="40" r="8.5" fill="url(#bg-diwali)"/>
            <circle class="bulb" cx="100"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="200"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="300"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="400"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="500"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="600"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="700"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="800"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="900"  cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="1000" cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="1100" cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
            <circle class="bulb" cx="1200" cy="14" r="6"   fill="url(#bg-diwali)" opacity=".8"/>
          </g>
        </svg>
      </div>
      <div class="balusters-row">
        <div class="baluster"></div><div class="baluster"></div>
        <div class="baluster"></div><div class="baluster"></div>
        <div class="baluster"></div><div class="baluster"></div>
        <div class="baluster"></div><div class="baluster"></div>
        <div class="baluster"></div><div class="baluster"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Visual component utilizing HTML/CSS logic provided for Diwali footer
</script>

<style scoped>
.diwali-footer-effect {
  position: relative;
}

/* diyas row — sits just above the bar */
.diyas-row {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  padding: 0 30px;
  position: relative;
  z-index: 20;
  margin-bottom: 2px;
}
.diya-wrap {
  display: flex; flex-direction: column; align-items: center;
  margin-bottom: -3px;
}
.diya-wrap:nth-child(2){animation-delay:.3s}
.diya-wrap:nth-child(3){animation-delay:.7s}
.diya-wrap:nth-child(4){animation-delay:.1s}
.diya-wrap:nth-child(5){animation-delay:.55s}
.diya-wrap:nth-child(6){animation-delay:.9s}
.diya-wrap:nth-child(7){animation-delay:.4s}

.flame {
  width:12px; height:26px; position:relative;
  margin-bottom:-2px;
  animation: flicker 1.6s ease-in-out infinite;
}
.diya-wrap:nth-child(odd) .flame { animation-delay:.5s; }
.flame::before {
  content:''; position:absolute;
  bottom:0; left:50%; transform:translateX(-50%);
  width:12px; height:26px;
  background:radial-gradient(ellipse at 50% 80%,#fffbe0 0%,#f8a820 40%,#e04c10 78%,transparent 100%);
  border-radius:50% 50% 30% 30%/60% 60% 40% 40%;
  filter:blur(.6px);
}
.flame::after {
  content:''; position:absolute;
  bottom:5px; left:50%; transform:translateX(-50%);
  width:6px; height:16px;
  background:radial-gradient(ellipse,#fff 25%,#ffe060 75%,transparent 100%);
  border-radius:50%; opacity:.85;
}
@keyframes flicker {
  0%,100%{transform:scaleX(1)   scaleY(1);   opacity:1}
  25%    {transform:scaleX(.88) scaleY(1.08);opacity:.95}
  50%    {transform:scaleX(1.1) scaleY(.92); opacity:1}
  75%    {transform:scaleX(.94) scaleY(1.05);opacity:.97}
}

.diya-bowl {
  position:relative;
  width:48px; height:22px;
  background:linear-gradient(180deg,#d05520 0%,#a83c10 50%,#7c2808 100%);
  border-radius:0 0 55% 55%/0 0 100% 100%;
  box-shadow: inset 0 2px 5px rgba(255,160,80,.3);
}
.diya-bowl::before {
  content:''; position:absolute;
  top:2px; left:50%; transform:translateX(-50%);
  width:32px; height:11px;
  background:radial-gradient(ellipse,#e06432 0%,transparent 70%);
  border-radius:50%;
}

@keyframes bulbPulse { 0%,100%{opacity:.75} 50%{opacity:1} }
.bulb { animation:bulbPulse 2.2s ease-in-out infinite; }
.bulb:nth-child(2){animation-delay:.2s}
.bulb:nth-child(3){animation-delay:.4s}
.bulb:nth-child(4){animation-delay:.6s}
.bulb:nth-child(5){animation-delay:.8s}
.bulb:nth-child(6){animation-delay:1s}
.bulb:nth-child(7){animation-delay:1.2s}
.bulb:nth-child(8){animation-delay:1.4s}
.bulb:nth-child(9){animation-delay:1.6s}
.bulb:nth-child(10){animation-delay:1.8s}
.bulb:nth-child(11){animation-delay:2s}
.bulb:nth-child(12){animation-delay:.3s}
.bulb:nth-child(13){animation-delay:.5s}
.bulb:nth-child(14){animation-delay:.7s}
.bulb:nth-child(15){animation-delay:.9s}
.bulb:nth-child(16){animation-delay:1.1s}
.bulb:nth-child(17){animation-delay:1.3s}
.bulb:nth-child(18){animation-delay:1.5s}
.bulb:nth-child(19){animation-delay:1.7s}
.bulb:nth-child(20){animation-delay:1.9s}
.bulb:nth-child(21){animation-delay:.15s}
.bulb:nth-child(22){animation-delay:.45s}
.bulb:nth-child(23){animation-delay:.75s}
.bulb:nth-child(24){animation-delay:1.05s}

/* balusters */
.baluster-wrap {
  position: relative;
  flex: 1;
  width: 100%;
}
.baluster-top-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 15px;
  background: #7030a8;
  box-shadow: 0 2px 8px rgba(120,40,200,0.5), inset 0 1px 2px rgba(220,160,255,0.25);
  z-index: 10;
}
.lights-strip {
  position: absolute;
  top: 8px; left: 0; right: 0;
  height: 56px;
  overflow: visible;
  z-index: 9;
}
.lights-strip svg { width:100%; height:100%; display:block; }
.balusters-row {
  display:flex; width:100%;
  justify-content:space-around;
  align-items: flex-start;
  padding:15px 8px 0;
  background: transparent;
  box-sizing: border-box;
}
.baluster {
  width: 54px; height: 161px;
  background:linear-gradient(90deg,#4a1270 0%,#5e1e90 40%,#4a1270 100%);
  clip-path:polygon(
    30% 0%,70% 0%,
    70% 18%,88% 24%,92% 42%,86% 58%,70% 63%,
    70% 76%,86% 82%,86% 100%,
    14% 100%,14% 82%,30% 76%,
    30% 63%,14% 58%,8% 42%,12% 24%,30% 18%
  );
  box-shadow:inset 1px 0 5px rgba(200,100,255,.12);
}

@media(max-width:600px){
  .diya-bowl{width:34px}
  .baluster{width:24px;height:60px}
}
</style>
