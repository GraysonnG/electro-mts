<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition"
  import { state, closeDetails } from "../state/store"
  import { clickOutside } from "../helpers/clickoutside"

  let show = false
  let mod;

  onMount(() => {
    state.subscribe(s => {
      show = !!s.detailId
      document.body.style.overflow = !!s.detailId ? "hidden" : null
      mod = s.modList.filter(m => (
        m.id === s.detailId
      ))[0]
    })
  })
  
  const handleClickOutside = () => {
    closeDetails()
  }

</script>

{#if show}
  <div
  transition:fade={{ duration: 200 }}
  class="bg"
  >
    <div
      use:clickOutside
      on:click_outside={handleClickOutside}
      class="modal"
      in:fly={{ y: -200, duration: 200 }}
      out:fly={{ y: 200, duration: 200 }}>

      <h3>{mod.name} <span>({mod.version})</span></h3>
      <p>Mod Id: <b>{mod.id}</b></p>
      <p>Author(s): <b>{mod.author}</b></p>
      <p>File Name: <b>{mod.fileName}</b></p>
      <p>Install Dir: <b>{mod.installDir}</b></p>
      <p>Description: <b>{mod.description}</b></p>
      <p>Tags: <b>{mod.tags?.join(", ")}</b></p>
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
    gap: 1em;
    margin-bottom: 0.25em;
    padding: 0.25em 0;
    border-bottom: 2px solid var(--grey-900);
  }

  b {
    font-size: 0.8em;
  }

  h3 span {
    font-size: 0.7em;
    opacity: 0.5;
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
    width: min(750px, 90vw);
    display: inline-block;
    border-radius: 0.5em;
    padding: 3em 2em;
    color: var(--grey-100);
    background-color: var(--grey-500);
    box-shadow: 0 0 2em rgba(0,0,0,0.8);
  }
</style>