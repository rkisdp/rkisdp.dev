import { ref } from 'vue'
import type Lenis from 'lenis'

const lenisInstance = ref<Lenis | null>(null)

export function useLenis() {
  return { lenis: lenisInstance }
}
