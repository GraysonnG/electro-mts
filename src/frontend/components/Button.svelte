<script>
  import { createEventDispatcher } from "svelte";
  import { applyTip } from "../state/tooltip";
  import { applyShortcut } from "../helpers/keyshortcuts";

  export let small = false;
  export let square = false;
  export let tooltip = undefined;
  export let shortcut = undefined
  
  const dispatch = createEventDispatcher()
  const onClick = (event) => {
    dispatch('click',event)
  }
</script>

<button use:applyShortcut={shortcut} use:applyTip={tooltip} class:small class:square on:click={onClick}>
  <slot />
</button>

<style>
  button {
    position: relative;
    padding: 0.5em 2em;
    border: none;
    border-radius: 0.25em;
    background-color: var(--grey-300);
    box-shadow: 0 0 0.5em var(--grey-900);
    transition: transform 250ms;
    color: var(--grey-100);
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
    background-color: white;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    aspect-ratio: 1;
    z-index: -1;
    transition: width 100ms;
    opacity: 0.1;
  }

  button:active {
    transform: scale(0.95);
  }

  button:hover::after {
    width: 125%;
  }
</style>
