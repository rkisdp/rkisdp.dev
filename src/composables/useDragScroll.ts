import { ref, type Ref } from 'vue';

/**
 * A composable that enables drag-to-scroll functionality for a container.
 * 
 * @param container - A Vue ref pointing to the scrollable HTML element.
 * @returns An object containing drag event handlers and reactive state.
 */
export function useDragScroll(container: Ref<HTMLElement | null>) {
  const isDown = ref(false);
  const startX = ref(0);
  const scrollLeft = ref(0);

  /**
   * Starts the drag operation.
   * @param e - The mouse event.
   */
  const startDrag = (e: MouseEvent) => {
    if (!container.value) return;
    isDown.value = true;
    container.value.classList.add('active');
    startX.value = e.pageX - container.value.offsetLeft;
    scrollLeft.value = container.value.scrollLeft;
  };

  /**
   * Stops the drag operation.
   */
  const stopDrag = () => {
    isDown.value = false;
    if (container.value) {
      container.value.classList.remove('active');
    }
  };

  /**
   * Handles the drag/scroll movement.
   * @param e - The mouse event.
   */
  const drag = (e: MouseEvent) => {
    if (!isDown.value || !container.value) return;
    e.preventDefault();
    const x = e.pageX - container.value.offsetLeft;
    const walk = (x - startX.value) * 2; // Scroll-fast
    container.value.scrollLeft = scrollLeft.value - walk;
  };

  return {
    startDrag,
    stopDrag,
    drag,
    isDragging: isDown
  };
}
