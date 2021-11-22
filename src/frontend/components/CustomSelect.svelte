<script>
  import EvaIcon from "./EvaIcon.svelte";
  import { fly } from 'svelte/transition';
  import { clickOutside } from "../helpers/clickoutside";

  export let items = []
  export let value = items[0]
  export let small = false

  const handleClick = (item) => {
    return (e) => {
      value = item
    }
  }

  const toggle = () => {
    open = !open
  }

  let open = false

</script>

<div class="select" class:open class:small on:click={toggle} use:clickOutside on:click_outside={() => { open = false }}>
  <div>
    <span>{value}</span>
    <EvaIcon name="arrow-down" size=14 />
  </div>
  {#if open}
    <div class="items" transition:fly={{ y: 30, duration: 150 }}>
      {#each items as item}
        <div on:click={handleClick(item)}>{item}</div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .select {
    position: relative;
    border: 2px solid var(--primary-700);
    border-radius: 0.25em;
    color: var(--grey-100);
    cursor: pointer;
    font-size: 0.825em;
    transition: transform 250ms;
    display: flex;
    padding-right: 1em;
  }

  .select > div:first-child:after {
    content: "";
    position: absolute;
    height: 0%;
    width: 0%;
    left: 50%;
    top: 50%;
    background-color: var(--primary-700);
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: width 100ms, height 100ms;
    opacity: 0.2;
  }

  .select:hover {
    transform: scale(1.05);
  }

  .select:hover > div:first-child::after, .select.open > div:first-child::after {
    width: 100%;
    height: 100%;
  }

  .select.open {
    transform: scale(1.05);
  }

  .select > div:first-child {
    padding: 0.5em 0;
    display: flex;
  }

  .select div span {
    padding: 0 2em;
    padding-right: 0.5em;
  }

  .select div :global(svg) {
    transition: transform 250ms;
  }

  .select.open div :global(svg) {
    transform: rotate(180deg);
  }

  .items {
    box-sizing: border-box;
    position: absolute;
    bottom: calc(100% + 1em);
    left: 0;
    display: flex;
    flex-direction: column;
    z-index: 2;
    background-color: var(--grey-500);
    border-radius: 0.5em;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  .items > div {
    padding: 1em 2em;
    white-space: nowrap;
    border-bottom: 1px solid var(--grey-700);
    background-color: transparent;
    transition: background-color 250ms;
  }

  .items > div:hover {
    background-color: var(--grey-300);
  }

  .small {
    font-size: 0.7em;
    padding: 0.5em 1em;
  }
</style>