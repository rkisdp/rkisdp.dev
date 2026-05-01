import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Options for the useIntersectionObserver composable.
 */
export interface IntersectionObserverOptions {
  /** The threshold at which the observer should trigger. Defaults to 0.1. */
  threshold?: number | number[];
  /** The root margin for the observer. Defaults to '0px'. */
  rootMargin?: string;
  /** Whether the visibility should be frozen once it becomes true. Defaults to true. */
  freezeOnceVisible?: boolean;
}

/**
 * A composable that tracks the visibility of an element using the Intersection Observer API.
 * 
 * @param target - A Vue ref pointing to the HTML element to observe.
 * @param options - Configuration options for the intersection observer.
 * @returns An object containing the `isVisible` reactive state.
 */
export function useIntersectionObserver(
  target: Ref<HTMLElement | null>,
  options: IntersectionObserverOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', freezeOnceVisible = true } = options;
  const isVisible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!target.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          if (freezeOnceVisible && observer) {
            observer.disconnect();
          }
        } else if (!freezeOnceVisible) {
          isVisible.value = false;
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(target.value);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return { isVisible };
}
