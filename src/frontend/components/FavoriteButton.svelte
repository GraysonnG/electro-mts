<script>
  import EvaIcon from "./EvaIcon.svelte";

  export let enabled = false

  const handleClick = () => {
    enabled = !enabled
  }

</script>

<div class:enabled on:click={handleClick}>
  <EvaIcon color="var(--grey-500)" name="heart-outline"/>
  <EvaIcon name="heart"/>
</div>

<style>
  div {
    position: relative;
    transition: transform 200ms cubic-bezier(.22,3.12,.43,.37);
    width: 24px;
    height: 24px;
  }

  div > :global(span) {
    position: absolute;
    left: 0;
    top: 0;
  }

  div > :global(:not(span:first-child)) {
    opacity: 0;
    transition: opacity 100ms;
  }

  div.enabled > :global(:not(span:first-child)) {
    opacity: 1;
  }

  div.enabled {
    transform: scale(1.2);
  }

  div :global(svg) {
    cursor: pointer;
    fill: var(--grey-100);
    transition: all 150ms;
  }

  div.enabled :global(svg) {
    fill: var(--pink-500);
  }
</style>