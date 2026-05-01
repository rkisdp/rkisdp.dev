import { onUnmounted } from 'vue';

/**
 * A composable that provides utilities to lock and unlock the body scroll.
 * Useful for modals, sidebars, and other overlays.
 */
export function useScrollLock() {
  /**
   * Locks the body scroll by setting overflow to hidden.
   */
  const lock = () => {
    document.body.style.overflow = 'hidden';
  };

  /**
   * Unlocks the body scroll by resetting the overflow property.
   */
  const unlock = () => {
    document.body.style.overflow = '';
  };

  onUnmounted(() => {
    unlock();
  });

  return { lock, unlock };
}
