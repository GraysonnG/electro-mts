<script>
  import { createEventDispatcher, onMount } from "svelte";
  import * as eva from "eva-icons";
  export let size = 24;
  export let name = "";
  export let color = "#ffffff";

  let cursorStyle = undefined
  let style = `
    display: inline-block;
    height: ${size}px;
    width: ${size}px;
    ${cursorStyle ? cursorStyle : ""}
  `

  onMount(() => {
    eva.replace();
  });

  const dispatch = createEventDispatcher()

  let handleClick = (e) => {
    dispatch('click', e)
  }

</script>

<span style={style} on:click={handleClick}>
  <i
    data-eva={name}
    data-eva-fill={color}
    data-eva-height={size}
    data-eva-width={size}
  />
</span>

<style>
  span {
    position: relative;
  }

  span > :global(svg) {
    position: absolute;
    inset: 0;
  }
</style>