<script>
  import Button from './Button.svelte';
  import CustomSelect from './CustomSelect.svelte';
  import { state, sendToLauncher, enableProfile } from '../state/store';
  import { onMount } from 'svelte';
  import EvaIcon from './EvaIcon.svelte';
  import AddProfile from '../modals/AddProfile.svelte';

  let current
  let modalOpen = false

  onMount(() => {
    state.subscribe(s => {
      if (s.profiles && current !== s.profiles.defaultList) {
        current = s.profiles.defaultList
        enableProfile(current)
      }
    })
  })
</script>

<footer>
  <Button on:click={() => {
    sendToLauncher($state)
  }}>Launch</Button>
  
  {#if $state.profiles}
    <CustomSelect items={Object.keys($state.profiles.lists)} bind:value={$state.profiles.defaultList} />
  {/if}
  <Button square tooltip="New Profile" on:click={() => {
    modalOpen = true
  }}>
    <EvaIcon 
      name="plus-outline"
      size=12
    />
  </Button>

  <Button square tooltip="Save Profile" on:click={() => {
    window.launcher.saveProfiles($state.profiles)
  }}>
    <EvaIcon 
      name="save"
      size=12
    />
  </Button>

  <AddProfile bind:show={modalOpen} />
</footer>

<style>
  footer {
  position: relative;
    height: 4em;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    background-color: var(--grey-500);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    padding: 0 2em;
    z-index: 1;
  }
</style>