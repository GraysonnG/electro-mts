<script>
  import Button from './Button.svelte'
</script>

<footer>
  <Button on:click={() => {
    window.launcher.launchMts({hello:"world"})
  }}>Launch</Button>
</footer>

<style>
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 4em;
    width: 100vw;
    display: grid;
    place-items: center;
    background-color: var(--grey-500);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    padding: 0 2em;
  }
</style>