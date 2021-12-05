<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { state, closeDetails } from "../state/store";
  import { clickOutside } from "../helpers/clickoutside";
  import Button from "../components/Button.svelte";

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

  const tagClicked = (e) => {
    const text = e.detail.target.innerText
    $state.filter = text
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

      <h2>{mod.name} <span>({mod.version})</span></h2>
      <p><span>Mod Id:</span> <b>{mod.id}</b></p>
      <p><span>Author(s):</span> <b>{mod.author}</b></p>
      <p><span>File Name:</span> <b>{mod.fileName}</b></p>
      <p><span>Install Dir:</span> <b>{mod.installDir}</b></p>
      <p><span>Description:</span> <b>{mod.description}</b></p>
      <div>
        <span>Tags:</span>
        
        {#each mod.tags as tag}
          <Button small on:click={tagClicked}>{tag}</Button>
        {/each}
        
      </div>
    </div>
  </div>
{/if}

<style>
  h2 {
    margin-bottom: 1em;
    display: flex;
    align-items: baseline;
    gap: 0.33em;
    line-height: 1;
  }

  p,.modal div {
    display: flex;
    gap: 1em;
    padding: 0.5em 0;
    border-bottom: 2px solid var(--grey-900);
    line-height: 1.5;
    align-items: baseline;
  }

  .modal div {
    align-items: center;
    gap: 0.5em;
    flex-wrap: wrap;
  }

  .modal div :global(button) {
    cursor: pointer;
  }

  b {
    font-size: 0.8em;
  }

  p span, p b  {
    display: inline-block;
  }


  h2 span {
    font-size: 0.5em;
    opacity: 0.5;
  }
  
  .bg {
    position: fixed;
    display: grid;
    z-index: 10010;
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
    max-height: 80vh;
    overflow-y: auto;
  }
</style>