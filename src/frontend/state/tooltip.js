import { writable } from "svelte/store"

export let tooltipData = writable({
  show: false,
  tip: "",
  x: -100,
  y: -100
})

export const applyTip = (node, tooltip) => {
  if (tooltip) {
    console.log(tooltip, node)
    console.log(node.getBoundingClientRect())


    node.addEventListener('mouseenter', () => {
      const box = node.getBoundingClientRect()
      const cX = box.x + box.width / 2
      const cY = box.y + box.height / 2

      tooltipData.update(_data => {
        return {
          show: true,
          tip: tooltip,
          x: cX,
          y: cY,
        }
      })
    })

    node.addEventListener('mouseleave', () => {
      tooltipData.update(_data => {
        return {
          show: false,
          tip: "",
          x: -100,
          y: -100
        }
      })
    })
  }
}