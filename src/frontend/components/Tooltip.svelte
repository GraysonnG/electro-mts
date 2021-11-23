<script>
  import { tooltipData } from "../state/tooltip"
  import { fly } from 'svelte/transition';

  $: style = `
    transform: translateX(${$tooltipData.x}px) translateY(${$tooltipData.y}px);
  ` 
</script>


{#if $tooltipData.show}
  <div in:fly={{ y: 10, duration: 100 }} style={style}>{$tooltipData.tip}</div>
{/if}


<style>
  div {
    position: fixed;
    top: calc(-3em - 0.5em);
    left: calc(-3em);
    z-index: 10000;
    background-color: var(--grey-900);
    border-radius: 0.5em;
    padding: 0.25em 0.5em;
    color: var(--grey-100);
    font-size: 0.75em;
  }
</style>