import { crossfade } from "svelte/transition";
import { quintOut } from "svelte/easing";

export const crossfadePos = crossfade({
  fallback(node, params) {
    const style = getComputedStyle(node)
    const transform = style.transform === 'none' ? '' : style.transform

    return {
      duration: params.duration,
      easing: quintOut,
      css: t => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
    }
  }
}) 