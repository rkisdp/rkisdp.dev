<template>
  <div class="splash-wrapper">
    <h1 class="splash-text" ref="measureRef">{{ text }}</h1>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps<{
  text: string;
  colors?: string[];
  letterGap?: number;
}>();

const COLORS = props.colors
// LETTER_GAP is now read from CSS letter-spacing

const measureRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Font size calculation is now handled by CSS to match HeroSection

function randomColor(): string {
  if (COLORS.length > 0) {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }
  const h = Math.random() * 360 | 0;
  const s = 80 + Math.random() * 20 | 0;
  const l = 42 + Math.random() * 18 | 0;
  return `hsl(${h},${s}%,${l}%)`;
}

function drawSplash(
  octx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number
): void {
  octx.save();
  octx.translate(x, y);
  octx.rotate(Math.random() * Math.PI * 2);

  // jagged main blob
  octx.beginPath();
  const pts = 10 + (Math.random() * 8 | 0);
  for (let i = 0; i <= pts; i++) {
    const a = (i / pts) * Math.PI * 2;
    const r = size * (0.5 + Math.random() * 0.7);
    i === 0
      ? octx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
      : octx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  octx.closePath();
  octx.fill();

  // satellite drips
  const drips = 3 + (Math.random() * 5 | 0);
  for (let d = 0; d < drips; d++) {
    const a = Math.random() * Math.PI * 2;
    const dst = size * (0.3 + Math.random() * 0.9);
    const cx = Math.cos(a) * dst;
    const cy = Math.sin(a) * dst;
    const sr = size * (0.05 + Math.random() * 0.18);
    octx.beginPath();
    octx.arc(cx, cy, sr, 0, Math.PI * 2);
    octx.fill();
    if (Math.random() > 0.4) {
      octx.save();
      octx.translate(cx, cy);
      octx.rotate(a + Math.PI / 2 + (Math.random() - 0.5) * 0.8);
      octx.scale(1, 1 + Math.random() * 3);
      octx.beginPath();
      octx.arc(0, 0, sr * 0.7, 0, Math.PI * 2);
      octx.fill();
      octx.restore();
    }
  }

  // micro scatter dots
  const dots = 8 + (Math.random() * 12 | 0);
  for (let i = 0; i < dots; i++) {
    const a = Math.random() * Math.PI * 2;
    const dst = size * (0.6 + Math.random() * 1.4);
    octx.beginPath();
    octx.arc(
      Math.cos(a) * dst,
      Math.sin(a) * dst,
      size * 0.02 + Math.random() * size * 0.05,
      0,
      Math.PI * 2
    );
    octx.fill();
  }

  octx.restore();
}

const PADDING = 60; // Increased padding to handle large splash overflows better

function render(): void {
  if (!measureRef.value || !canvasRef.value) return;

  const style = window.getComputedStyle(measureRef.value);
  const fontString = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const letterSpacing = parseFloat(style.letterSpacing) || 0;

  // Measure font accurately on an offscreen context
  const offscreenCanvas = document.createElement('canvas');
  const offCtx = offscreenCanvas.getContext('2d');
  if (!offCtx) return;
  offCtx.font = fontString;

  const chars = [...props.text];
  
  // Get precise metrics for each character
  const metrics = chars.map(ch => {
    const m = offCtx.measureText(ch);
    return {
      width: m.width,
      ascent: m.actualBoundingBoxAscent,
      descent: m.actualBoundingBoxDescent
    };
  });

  const totalW = metrics.reduce((a, b) => a + b.width, 0) + letterSpacing * (chars.length - 1);
  const maxAscent = Math.max(...metrics.map(m => m.ascent));
  const maxDescent = Math.max(...metrics.map(m => m.descent));
  // Use a slightly larger height for the text area to handle font rendering quirks
  const textHeight = maxAscent + maxDescent;

  const canvas = canvasRef.value;
  
  // Set buffer size
  canvas.width = totalW + PADDING * 2;
  canvas.height = textHeight + PADDING * 2;
  
  // Set style size
  canvas.style.width = (totalW + PADDING * 2) + 'px';
  canvas.style.height = (textHeight + PADDING * 2) + 'px';
  
  // Position canvas centered over the placeholder text's middle
  canvas.style.left = '50%';
  canvas.style.top = '50%';
  canvas.style.transform = `translate(-50%, -50%)`;

  const W = canvas.width;
  const H = canvas.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  /* ── STEP 1: text mask (white letters on transparent) ── */
  const maskC = document.createElement('canvas');
  maskC.width = W;
  maskC.height = H;
  const maskCtx = maskC.getContext('2d');
  if (!maskCtx) return;

  maskCtx.font = fontString;
  maskCtx.textBaseline = 'alphabetic';
  maskCtx.fillStyle = 'white';

  const baselineY = PADDING + maxAscent;
  
  let drawX = PADDING;
  chars.forEach((ch, i) => {
    // Fill text multiple times or with a shadow to "thickening" the mask slightly if needed
    // for this specific font
    maskCtx.fillText(ch, drawX, baselineY);
    drawX += metrics[i].width + letterSpacing;
  });

  /* ── STEP 1.5: faint base layer (semi-transparent paint background) ── */
  const baseC = document.createElement('canvas');
  baseC.width = W;
  baseC.height = H;
  const baseCtx = baseC.getContext('2d');
  if (!baseCtx) return;

  baseCtx.font = fontString;
  baseCtx.textBaseline = 'alphabetic';
  // Use a very faint version of the first theme color or a neutral one
  const baseColor = COLORS.length > 0 ? COLORS[0] : '#ffffff';
  baseCtx.fillStyle = baseColor;
  baseCtx.globalAlpha = 0.15; // Very subtle base coat

  let baseDrawX = PADDING;
  chars.forEach((ch, i) => {
    baseCtx.fillText(ch, baseDrawX, baselineY);
    baseDrawX += metrics[i].width + letterSpacing;
  });

  /* ── STEP 2: random coloured splashes on offscreen canvas ── */
  const splashC = document.createElement('canvas');
  splashC.width = W;
  splashC.height = H;
  const splashCtx = splashC.getContext('2d');
  if (!splashCtx) return;

  // Significantly increased splash count for better coverage
  const total = 180 + (Math.random() * 60 | 0);
  for (let i = 0; i < total; i++) {
    splashCtx.fillStyle = randomColor();
    
    // Better distribution: specifically target the character areas
    // by picking a random character and splashing near it
    const randomCharIdx = Math.floor(Math.random() * chars.length);
    let charX = PADDING;
    for(let j = 0; j < randomCharIdx; j++) charX += metrics[j].width + letterSpacing;
    charX += metrics[randomCharIdx].width / 2;

    const sX = charX + (Math.random() - 0.5) * metrics[randomCharIdx].width * 1.5;
    const sY = baselineY - (maxAscent / 2) + (Math.random() - 0.5) * textHeight * 1.2;
    
    drawSplash(
      splashCtx,
      sX,
      sY,
      10 + Math.random() * 40
    );
  }

  /* ── STEP 3: clip splashes to letter shapes ── */
  splashCtx.globalCompositeOperation = 'destination-in';
  splashCtx.drawImage(maskC, 0, 0);
  splashCtx.globalCompositeOperation = 'source-over';

  /* ── STEP 4: paint to visible canvas ── */
  ctx.clearRect(0, 0, W, H);
  // Layering: base coat first, then clipped splashes
  ctx.drawImage(baseC, 0, 0);
  ctx.drawImage(splashC, 0, 0);
}

let resizeTimeout: number | null = null;

function handleResize(): void {
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
  resizeTimeout = window.setTimeout(() => {
    if (document.fonts) {
      document.fonts.ready.then(render);
    } else {
      render();
    }
  }, 150);
}

onMounted(() => {
  if (document.fonts) {
    document.fonts.ready.then(render);
  } else {
    render();
  }
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (resizeTimeout) {
    clearTimeout(resizeTimeout);
  }
});

// Re-render when text prop changes
watch(() => props.text, () => {
  if (document.fonts) {
    document.fonts.ready.then(render);
  } else {
    render();
  }
});
</script>

<style scoped>
.splash-text {
  /* Exact match for text-5xl sm:text-7xl md:text-9xl */
  font-size: 3rem; /* text-5xl */
  font-weight: 800; /* font-bold to match default */
  letter-spacing: -0.05em; /* tracking-tighter */
  text-transform: uppercase;
  line-height: 1.1;
  margin: 0;
  visibility: hidden;
  white-space: nowrap;
}

@media (min-width: 640px) {
  .splash-text {
    font-size: 4.5rem; /* sm:text-7xl */
  }
}

@media (min-width: 768px) {
  .splash-text {
    font-size: 8rem; /* md:text-9xl */
  }
}

.splash-wrapper {
  position: relative;
  display: inline-block;
  /* Allow organic splashes to bleed slightly beyond the text rectangle */
  overflow: visible;
}

canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  /* Ensure the canvas scales down on smaller viewports */
  max-width: 100%;
  height: auto !important;
}
</style>
