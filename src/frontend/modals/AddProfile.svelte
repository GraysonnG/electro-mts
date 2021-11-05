<script>
  import { fade, fly } from "svelte/transition"
  import { state } from "../state/store"
  import { clickOutside } from "../helpers/clickoutside"
  import TextInput from "../components/TextInput.svelte";
  import Button from "../components/Button.svelte";

  export let show = false
  let text = ""

  const handleClickOutside = () => {
    show = false
    text = ""
    document.body.style.overflow = null
  }

  const handleDone = () => {
    if (text) {
      state.update(s => {
        const profiles = {...s.profiles}
        profiles.lists[text] = []
        profiles.defaultList = text
        return {
          ...s,
          profiles
        }
      })

      show = false
      text = ""
    }
    document.body.style.overflow = null
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
      <h3>Add A Mod Profile</h3>
      <p>Name: <TextInput small bind:value={text} /></p>
      <div><Button on:click={handleDone}>Done</Button></div>
    </div>
  </div>
{/if}

<style>
  h3 {
    margin-bottom: 1em;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    gap: 0.5em;
  }

  p {
    display: flex;
    gap: 1em;
    margin-bottom: 0.25em;
    padding: 0.25em 0;
    align-items: center;
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
    width: min(400px, 90vw);
    display: inline-block;
    border-radius: 0.5em;
    padding: 3em 2em;
    color: var(--grey-100);
    background-color: var(--grey-500);
    box-shadow: 0 0 2em rgba(0,0,0,0.8);
  }

  .modal div {
    margin-top: 1em;
    display: flex;
    justify-content: center;
  }
</style>