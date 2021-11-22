<script>
  import EvaIcon from "./EvaIcon.svelte";
  import { fly } from 'svelte/transition';
  import { clickOutside } from "../helpers/clickoutside";

  export let items = [
    "<Default>",
    "demo",
    "really-really-long-profile-name"
  ]
  
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

<div class="select" class:small on:click={toggle} use:clickOutside on:click_outside={() => { console.log("click outside"); open = false }}>
  <div>
    {value}
    <!-- <EvaIcon name="arrow-down-outline" size=13 /> -->
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
    padding: 0.5em 2em;
    border: 2px solid var(--primary-700);
    border-radius: 0.25em;
    color: var(--grey-100);
    cursor: pointer;
    font-size: 0.825em;
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