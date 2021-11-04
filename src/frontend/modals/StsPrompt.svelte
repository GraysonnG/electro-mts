<script>
  import Button from "../components/Button.svelte"
  import { state } from '../state/store'

  const handleClick = () => {
    window.launcher.openDialog({
      title: 'Select Slay The Spire Folder...',
      properties: ['openDirectory']
    })
  }

  $: show = !$state.stsDir

</script>

{#if show}
  <div class="bg">
    <div class="modal">
      <h3>Could not find your Slay The Spire installation...</h3>
      <p><Button on:click={handleClick}>Browse...</Button> Select Slay the Spire folder.</p>
    </div>
  </div>
{/if}

<style>
  h3 {
    margin-bottom: 1em;
  }

  p {
    display: flex;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
  }

  .bg {
    position: fixed;
    display: grid;
    z-index: 10000;
    inset: 0;
    background-color: rgba(0,0,0,0.5);
    place-items: center;
  }

  .modal {
    display: inline-block;
    border-radius: 0.5em;
    padding: 3em 2em;
    color: white;
    background-color: var(--grey-500);
    box-shadow: 0 0 2em rgba(0,0,0,0.8);
  }
</style>