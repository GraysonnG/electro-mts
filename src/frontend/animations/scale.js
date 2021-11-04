import { quintOut } from "svelte/easing"

export const scale = (node, { x = true, y = true, duration }) => {
  return {
    duration,
    css: t => {
      const eased = quintOut(t)
      const sX = x ? `scaleX(${eased})` : ''
      const sY = y ? `scaleY(${eased})` : ''

      return `
        transform: ${sX} ${sY};
      `
    }
  }
}