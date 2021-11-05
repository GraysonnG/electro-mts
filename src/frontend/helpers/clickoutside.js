export const clickOutside = (node) => {
  const handleClick = (event) => {
    if (
      node &&
      !node.contains(event.target) &&
      !node.defaultPrevented
    ) {
      node.dispatchEvent(
        new CustomEvent('click_outside', { detail: node })
      )
    }
  }
  
  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    },
  };
};
