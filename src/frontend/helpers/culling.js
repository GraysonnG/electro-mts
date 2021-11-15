const callbacks = new Map();

export const observer = new IntersectionObserver(elements => {
  elements.forEach(element => {
    for (let [elem, callback] of callbacks.entries()) {
      if (elem === element.target) {
        callback(element)
      }
    }
  })
})

export const cull = (node) => {
  observer.observe(node)

  callbacks.set(node, (element) => {
    node.dispatchEvent(new CustomEvent('cull', {
      detail: {
        node,
        visible: element.isIntersecting
      }
    }))
  })

  return {
    destroy() {
      observer.unobserve(node)
      callbacks.delete(node)
    }
  }
}