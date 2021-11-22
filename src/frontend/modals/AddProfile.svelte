<script>
  import { fly } from "svelte/transition"
  import { state } from "../state/store"
  import { clickOutside } from "../helpers/clickoutside"
  import TextInput from "../components/TextInput.svelte";
  import Button from "../components/Button.svelte";

  export let show = false
  let text = ""

  const handleClickOutside = () => {
    show = false
    text = ""
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
  }
</script>

{#if show}
  <div
    use:clickOutside
    on:click_outside={handleClickOutside}
    class="modal"
    in:fly={{ y: 30, duration: 200 }}
    out:fly={{ y: 30, duration: 200 }}>
    <h3>Add A Mod Profile</h3>
    <p>Name: <TextInput small bind:value={text} /></p>
    <div><Button on:click={handleDone}>Done</Button></div>
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

  .modal {
    position: absolute;
    width: min(400px, 90vw);
    display: inline-block;
    border-radius: 0.5em;
    padding: 2em 2em;
    color: var(--grey-100);
    background-color: var(--grey-500);
    box-shadow: 0 0 2em rgba(0,0,0,0.8);
    bottom: calc(100% + 1em);
    left: 50%;
    transform: translateX(-50%);
  }

  .modal div {
    margin-top: 1em;
    display: flex;
    justify-content: center;
  }
</style>