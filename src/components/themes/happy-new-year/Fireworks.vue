<template>
  <canvas ref="canvas" class="fireworks-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrame: number;
let fireworks: Firework[] = [];
let particles: FwParticle[] = [];
let spawnInterval: any = null;

class Firework {
  x: number;
  y: number;
  targetY: number;
  hue: number;
  brightness: number;
  element: { y: number };

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = height;
    this.targetY = Math.random() * (height * 0.5);
    this.hue = Math.random() * 360;
    this.brightness = 50 + Math.random() * 50;
    this.element = { y: this.y };
    this.animate();
  }

  animate() {
    gsap.to(this.element, {
      y: this.targetY,
      duration: 1.5 + Math.random(),
      ease: "power2.out",
      onUpdate: () => {
        this.y = this.element.y;
      },
      onComplete: () => {
        explode(this.x, this.y, this.hue);
        fireworks = fireworks.filter((f) => f !== this);
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
    ctx.fill();
  }
}

class FwParticle {
  x: number;
  y: number;
  hue: number;
  brightness: number;
  angle: number;
  speed: number;
  gravity: number;
  opacity: number;
  element: { x: number, y: number, opacity: number };

  constructor(x: number, y: number, hue: number) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.brightness = 50 + Math.random() * 50;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 2 + Math.random() * 5;
    this.gravity = 0.5;
    this.opacity = 1;
    this.element = { x: this.x, y: this.y, opacity: this.opacity };
    this.animate();
  }

  animate() {
    gsap.to(this.element, {
      x: this.x + Math.cos(this.angle) * this.speed * 50,
      y: this.y + Math.sin(this.angle) * this.speed * 50 + this.gravity * 50,
      opacity: 0,
      duration: 1 + Math.random(),
      ease: "power1.out",
      onUpdate: () => {
        this.x = this.element.x;
        this.y = this.element.y;
        this.opacity = this.element.opacity;
      },
      onComplete: () => {
        particles = particles.filter((p) => p !== this);
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
    ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
    ctx.fill();
    ctx.restore();
  }
}

function explode(x: number, y: number, hue: number) {
  for (let i = 0; i < 40; i++) {
    particles.push(new FwParticle(x, y, hue));
  }
}

const startFireworks = () => {
  if (!canvas.value) return;
  
  const resize = () => {
    if (!canvas.value) return;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  };
  
  window.addEventListener('resize', resize);
  resize();
  
  ctx = canvas.value.getContext('2d');
  
  const animate = () => {
    if (!ctx || !canvas.value) return;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.globalCompositeOperation = 'source-over';
    
    fireworks.forEach(f => f.draw(ctx!));
    particles.forEach(p => p.draw(ctx!));
    
    animationFrame = requestAnimationFrame(animate);
  };
  
  animate();
  
  spawnInterval = setInterval(() => {
    if (canvas.value) {
      fireworks.push(new Firework(canvas.value.width, canvas.value.height));
    }
  }, 600);
};

onMounted(() => {
  startFireworks();
});

onUnmounted(() => {
  clearInterval(spawnInterval);
  cancelAnimationFrame(animationFrame);
  gsap.killTweensOf("*");
});
</script>

<style scoped>
.fireworks-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50; /* Ensuring high z-index so it's always visible */
}
</style>
