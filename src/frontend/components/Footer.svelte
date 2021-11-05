<script>
  import Button from './Button.svelte'
  import Select from "./Select.svelte"
  import { state, enableModList, sendToLauncher } from '../state/store'
  import { onMount } from 'svelte';
  import EvaIcon from './EvaIcon.svelte';
  import AddProfile from '../modals/AddProfile.svelte';

  let current
  let modalOpen = true

  onMount(() => {
    state.subscribe(s => {
      if (s.profiles && current !== s.profiles.defaultList) {
        current = s.profiles.defaultList
        
        const currentList = s.profiles.lists[current]

        enableModList(...currentList)
      }
    })
  })
</script>

<footer>
  <Button on:click={() => {
    sendToLauncher($state)
  }}>Launch</Button>
  
  {#if $state.profiles}
    <Select items={Object.keys($state.profiles.lists)} bind:value={$state.profiles.defaultList} />
  {/if}
  <Button square on:click={() => {
    modalOpen = true
  }}>
    <EvaIcon 
      name="plus-outline"
      size=12
    />
  </Button>
</footer>

<AddProfile bind:show={modalOpen} />

<style>
  footer {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 4em;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    background-color: var(--grey-500);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    padding: 0 2em;
  }
</style>