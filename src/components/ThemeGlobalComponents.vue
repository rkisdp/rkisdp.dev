<template>
  <template v-for="comp in globalComponents" :key="comp.name">
    <component :is="comp.component" />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../composables/useTheme';

const { currentTheme } = useTheme();

const globalComponents = computed(() => 
  currentTheme.value.components.filter(c => c.isGlobal)
);
</script>
