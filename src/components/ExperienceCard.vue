<template>
  <div class="exp-card">
    <div class="circle-icon">
      <img :src="job.logo" :alt="job.company" class="company-logo" />
    </div>
    <div class="exp-content">
      <h3>{{ job.position }}</h3>
      <h4>
        <a
          :href="job.url"
          target="_blank"
          rel="noopener noreferrer"
          class="company-link"
          @click.stop
        >
          {{ job.company }}
          <svg
            class="inline-block ml-1 w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </h4>
      <p>{{ job.shortPeriod }}</p>
      <button class="details-btn" @click="$emit('click')">
        View details <span class="arrow">→</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  job: {
    type: Object,
    required: true,
  },
});

defineEmits(["click"]);
</script>

<style scoped>
.exp-card {
  background: linear-gradient(
    to bottom,
    rgba(17, 24, 39, 0.9),
    rgba(17, 24, 39, 0.7)
  );
  border: 1px solid rgba(55, 65, 81, 0.5);
  border-radius: 0.6rem;
  padding: 1rem;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 280px;
  margin: 0 auto;
}

.exp-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent 50%);
  z-index: -1;
}

.exp-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(59, 130, 246, 0.4);
}

.circle-icon {
  width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(
    145deg,
    rgba(30, 58, 138, 0.4),
    rgba(30, 58, 138, 0.2)
  );
  border-radius: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.3);
  margin-bottom: 0.75rem;
  overflow: hidden;
}

.company-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0.15rem;
}

.exp-content {
  width: 100%;
}

.exp-content h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e0f2fe;
  margin-bottom: 0.2rem;
}

.exp-content h4 {
  font-size: 0.75rem;
  color: rgba(229, 231, 235, 0.9);
  margin-bottom: 0.2rem;
}

.exp-content p {
  font-size: 0.65rem;
  color: #9ca3af;
  margin-bottom: 0.6rem;
}

.details-btn {
  background: transparent;
  border: none;
  font-size: 0.65rem;
  color: rgba(96, 165, 250, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.15rem 0.35rem;
  border-radius: 0.25rem;
}

.details-btn:hover {
  color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.1);
}

.details-btn .arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.details-btn:hover .arrow {
  transform: translateX(3px);
}

.company-link {
  color: inherit;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
}

.company-link:hover {
  color: #3b82f6;
}

.company-link svg {
  opacity: 0.7;
  transition: all 0.2s ease;
}

.company-link:hover svg {
  opacity: 1;
  transform: translate(1px, -1px);
}

@media (max-width: 768px) {
  .exp-card {
    padding: 0.875rem;
    margin-bottom: 1.25rem;
    max-width: 260px;
  }

  .circle-icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 0.6rem;
  }
}
</style>
