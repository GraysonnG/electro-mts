<script>
  import { onMount } from "svelte";
  import { ERROR } from "../../common/constants";
  import { state } from '../state/store';
  import { fade, fly } from 'svelte/transition'
  import EvaIcon from '../components/EvaIcon.svelte'

  var show;
  var error;

  onMount(() => {
    state.subscribe(s => {
      show = s.error && s.error !== ERROR.CANT_FIND_STS
      document.body.style.overflow = show ? "hidden" : null
      error = s.error
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
        There was an Error!
      </h3>

      <p>{error.stack}</p>
    </div>
  </div>
{/if}

<style>
  h3 {
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
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