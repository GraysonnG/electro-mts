<script>
  import { createEventDispatcher } from "svelte";
  import Checkbox from "./Checkbox.svelte";
  import Button from "./Button.svelte";
  import EvaIcon from "./EvaIcon.svelte";
  import FavoriteButton from "./FavoriteButton.svelte";
  import { openDetails, state, toggleMod } from "../state/store";
  import { cull } from "../helpers/culling";

  export let data;
  let visible = true;
  let warn = false;

  const dispatch = createEventDispatcher()
  const handleClick = (e) => {
    const source = e.path[0]
    if (source.tagName === "SPAN" || source.tagName === "DIV") {
      dispatch('click', {
        modId: data.id,
        event: e
      })
    }
  }

  const handleFavorite = (e) => {
    dispatch('favorite', {
      modId: data.id,
      event: e
    })
  }

  const handleDetails = (e) => {
    openDetails(data.id)
  }

  const handleCull = (e) => {
    visible = e.detail.visible
  }

  let authorString = data.author.length > 50 ? `${data.author.substring(0, 50)}...` : data.author
  
  $: missingDependencies = data.deps?.filter(modid => {
    const linkedDependency = $state.modList.find(mod => mod.id === modid)
    return (linkedDependency && !linkedDependency.checked && data.checked) || linkedDependency === undefined
  }) || [] 
  $: error = missingDependencies.length > 0
  $: selected = data.checked
  $: tagfound = data.tags.find(tag => tag.toLowerCase() === $state.filter.toLowerCase())
</script>

<div 
  use:cull 
  on:cull={handleCull} 
  class:selected 
  class:error
  class:warn
  on:contextmenu={handleDetails}
  on:click={handleClick}>
  {#if visible}
    <Checkbox bind:checked={selected} id={data.id} />
    <span>
      {data.name}
      {#if data.local}
        <EvaIcon 
          color="var(--grey-100)"
          name="folder"
          size=12
        />
      {:else}
        <EvaIcon 
          color="var(--grey-100)"
          name="globe"
          size=12
        />
      {/if}
    </span>
    <span class="small">({data.version})</span>
    <span class="small grow">by: {authorString}</span>
    {#if tagfound}
      <span class="tag">
        <Button small>{tagfound}</Button>
      </span>
    {/if}
    {#if error}
      <span class="missing">
        {#if data.checked}
          Missing:
        {:else}
          Not Installed:
        {/if}
        {#each missingDependencies as dep}
          <Button small on:click={() => {
            toggleMod(dep)
          }}>{dep}</Button>
        {/each}
      </span>
    {/if}

    <FavoriteButton on:favorite={handleFavorite} enabled={data.favorited} />

    <EvaIcon
      color="var(--grey-100)"
      on:click={handleDetails}
      name="chevron-right"/>
  {/if}
</div>

<style>
  div {
    display: flex;
    color: var(--grey-100);
    border-radius: 0.5em;
    background: var(--grey-500);
    padding: 0.5em 1em;
    gap: 1em;
    align-items: center;
    cursor: pointer;
    transition: border 500ms, transform 200ms;
    min-height: 44px;
  }

  
  div:hover {
    transform: scale(1.02);
  }
  
  div.selected {
    background: var(--grey-300);
  }
  
  div.error {
    background: linear-gradient(to right, var(--red-500), var(--grey-500) 50%);
  }

  div.selected.error {
    background: linear-gradient(to right, var(--red-500), var(--grey-300) 50%);
  }
  
  div.warn {
    border-right: 0.25em solid var(--yellow-500);
  }

  .small {
    opacity: 0.5;
    font-weight: 100;
    font-size: .75em;
  }

  .grow {
    flex-grow: 1;
  }

  .missing {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
  }
</style>