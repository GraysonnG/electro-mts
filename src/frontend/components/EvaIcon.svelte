<script>
  import { onMount } from "svelte";
  import * as eva from "eva-icons";
  export let size = 24;
  export let name = "";
  export let onClick = undefined;
  export let color = "#ffffff";

  let cursorStyle = onClick ? "cursor: pointer;" : undefined
  let style = `
    display: inline-block;
    height: ${size}px;
    width: ${size}px;
    ${cursorStyle ? cursorStyle : ""}
  `

  onMount(() => {
    eva.replace();
  });
</script>

<span style={style} on:click={onClick}>
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