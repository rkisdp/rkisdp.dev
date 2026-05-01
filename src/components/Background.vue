<template>
  <div class="background-container">
    <canvas id="bg-canvas" ref="canvasRef"></canvas>
    <div class="scanline"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let W: number, H: number;
let particles: Particle[] = [];
let animationId: number;

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;

  constructor() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5);
    this.vy = (Math.random() - 0.5);
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.3 + 0.7;
    this.color = Math.random() > 0.7 ? 'green' : 'cyan';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
}

function resize() {
  if (!canvasRef.value) return;
  W = canvasRef.value.width = window.innerWidth;
  H = canvasRef.value.height = window.innerHeight;
}

function initParticles(n: number) {
  particles = [];
  for (let i = 0; i < n; i++) particles.push(new Particle());
}

function draw() {
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,245,255,${(1 - dist / 140) * 0.55})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  particles.forEach(p => {
    p.update();
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color === 'cyan'
      ? `rgba(0,220,255,${p.alpha})`
      : `rgba(0,255,140,${p.alpha})`;
    ctx.fill();
  });

  animationId = requestAnimationFrame(draw);
}

const handleResize = () => {
  resize();
  initParticles(160);
};

onMounted(() => {
  if (!canvasRef.value) return;
  ctx = canvasRef.value.getContext('2d');
  resize();
  initParticles(160);
  draw();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  cancelAnimationFrame(animationId);
});
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background: #0a1e35;
  overflow: hidden;
  pointer-events: none;
}

#bg-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  z-index: 2;
  pointer-events: none;
}
</style>
