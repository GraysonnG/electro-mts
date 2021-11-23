<script>
  import Button from "../components/Button.svelte";
  import { state } from '../state/store';
  import { fade, fly } from 'svelte/transition';
  import EvaIcon from '../components/EvaIcon.svelte';
  import { onMount } from "svelte";
  import { ERROR } from '../../common/constants';

  const handleClick = () => {
    window.launcher.openDialog({
      title: 'Select Slay The Spire Folder...',
      properties: ['openDirectory']
    })
  }
  
  var show = $state.error === ERROR.CANT_FIND_STS

  onMount(() => {
    state.subscribe(s => {
      show = s.error === ERROR.CANT_FIND_STS
    })
  })

</script>

{#if show}
  <div transition:fade={{duration: 200}} class="bg">
    <div out:fly={{ x: -200, duration: 200 }} class="modal">
      <h3>
        <EvaIcon 
          name="alert-triangle-outline"
          color="#ff5555"
          size=30
        />
        Could not find your Slay The Spire installation...
      </h3>
      <p><Button on:click={handleClick}>Browse...</Button> Select Slay the Spire folder.</p>
    </div>
  </div>
{/if}

<style>
  h3 {
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  p {
    display: flex;
    gap: 0.5em;
    justify-content: center;
    align-items: center;
    opacity: 0.77;
    font-size: 0.9em;
  }

  .bg {
    position: fixed;
    display: grid;
    z-index: 10000;
    inset: 0;
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(3px);
    place-items: center;
    overflow: hidden;
  }

  .modal {
    display: inline-block;
    border-radius: 0.5em;
    padding: 3em 2em;
    color: var(--grey-100);
    background-color: var(--grey-500);
    box-shadow: 0 0 2em rgba(0,0,0,0.8);
  }
</style>