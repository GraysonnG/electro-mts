<script>
  import { createEventDispatcher } from "svelte";
  
  export let small = false;
  export let square = false;
  
  const dispatch = createEventDispatcher()
  const onClick = (event) => {
    dispatch('click',event)
  }
</script>

<button class:small class:square on:click={onClick}>
  <slot />
</button>

<style>
  button {
    position: relative;
    padding: 0.5em 2em;
    border: 2px solid var(--primary-700);
    border-radius: 0.25em;
    background-color: transparent;
    transition: transform 250ms;
    color: white;
    overflow: hidden;
    z-index: 0;
  }

  button:hover {
    transform: scale(1.05);
  }

  button.small {
    font-size: 0.7em;
    padding: 0.5em 1em;
  }

  button.square {
    display: flex;
    padding: 0.5em 0.5em;
    aspect-ratio: 1;
    justify-content: center;
    align-items: center;
  }

  button::after {
    position: absolute;
    content: "";
    width: 0%;
    left: 50%;
    top: 50%;
    background-color: var(--primary-700);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 1;
    z-index: -1;
    transition: width 100ms;
    opacity: 0.2;
  }

  button:active {
    transform: scale(0.95);
  }

  button:hover::after {
    width: 125%;
  }
</style>
