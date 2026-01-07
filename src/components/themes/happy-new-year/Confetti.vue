<template>
  <canvas ref="canvas" class="confetti-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from '../../../composables/useTheme';

const { currentThemePhase, setThemePhase } = useTheme();
const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrame: number;
let particles: Particle[] = [];
let isSpawning = ref(currentThemePhase.value === 'confetti-spawning');

class Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'square' | 'circle' | 'triangle';
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  isDead: boolean = false;

  constructor(width: number, height: number, initial = false) {
    this.x = Math.random() * width;
    this.y = initial ? Math.random() * height : -Math.random() * 20 - 10;
    this.size = Math.random() * 8 + 4;
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    const shapes: ('square' | 'circle' | 'triangle')[] = ['square', 'circle', 'triangle'];
    this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 3 + 2;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }

  update(width: number, height: number, spawning: boolean) {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    if (this.y > height) {
      if (spawning) {
        this.y = -20;
        this.x = Math.random() * width;
      } else {
        this.isDead = true;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;

    if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(-this.size / 2, this.size / 2);
      ctx.lineTo(this.size / 2, this.size / 2);
      ctx.lineTo(0, -this.size / 2);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    }
    ctx.restore();
  }
}

const CONFETTI_DURATION = 2000;

const init = () => {
  if (!canvas.value) return;
  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  const resize = () => {
    if (!canvas.value) return;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  };

  window.addEventListener('resize', resize);
  resize();

  particles = Array.from({ length: 150 }, () => new Particle(canvas.value!.width, canvas.value!.height, true));

  const animate = () => {
    if (particles.length === 0 && !isSpawning.value) {
      if (ctx && canvas.value) ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      cancelAnimationFrame(animationFrame);
      return;
    }

    ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(canvas.value!.width, canvas.value!.height, isSpawning.value);
      if (particles[i].isDead) {
        particles.splice(i, 1);
      } else {
        particles[i].draw(ctx);
      }
    }
    
    animationFrame = requestAnimationFrame(animate);
  };

  animate();

  setTimeout(() => {
    isSpawning.value = false;
    if (currentThemePhase.value === 'confetti-spawning') {
      setThemePhase('fireworks-active');
    }
  }, CONFETTI_DURATION);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  isSpawning.value = false;
  cancelAnimationFrame(animationFrame);
});
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}
</style>
