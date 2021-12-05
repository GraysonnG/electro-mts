<script>
  import Mod from './Mod.svelte';
  import Button from './Button.svelte';
  import { favoriteMod, state, toggleMod, unselectAllMods } from '../state/store';
  import { flip } from "svelte/animate";
  import { filterMods } from '../helpers/filter';
  import { onMount } from 'svelte';

  const handleClick = (e) => {
    toggleMod(e.detail.modId)
  }

  const handleFavorite = (e) => {
    favoriteMod(e.detail.modId)
  }

  const removeAll = () => {
    unselectAllMods()
  }

  let masterList = filterMods($state.modList, $state.filter)
  $: activeList = $state.modList.filter(m => m.checked)
  $: nonactiveList = masterList.filter(m => !m.checked)

  onMount(() => {
    state.subscribe(state => {
      masterList = filterMods(state.modList, state.filter)
    })
  })
</script>

<div>
  {#if activeList.length > 0}
    <span>
      Enabled ({activeList.length}) 
      <Button on:click={removeAll} small>Remove All</Button>
    </span>
    {#each activeList as mod (mod.id)}
      <li animate:flip={{duration: 150}}>
        <Mod on:favorite={handleFavorite} on:click={handleClick} data={mod} />
      </li>
    {/each}
  {/if}
  <span>Available:</span>
  {#each nonactiveList as mod (mod.id)}
    <li animate:flip={{duration: 150}}>
      <Mod on:favorite={handleFavorite} on:click={handleClick} data={mod} />
    </li>
  {/each}
</div>

<style>
  span {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  li {
    display: block;
  }

  div {
    color: var(--grey-100);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
		padding: 1em;
		color: var(--grey-100);
  }
</style>