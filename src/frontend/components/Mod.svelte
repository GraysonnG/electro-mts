<script>
  import { createEventDispatcher } from "svelte";
  import Checkbox from "./Checkbox.svelte";
  import Button from "./Button.svelte";
  import EvaIcon from "./EvaIcon.svelte";
  import FavoriteButton from "./FavoriteButton.svelte";
  import { openDetails, state, toggleMod } from "../state/store";
  import { cull } from "../helpers/culling"

  export let data;
  let visible = true;

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

  const handleCull = (e) => {
    visible = e.detail.visible
  }

  let authorString = data.author.length > 50 ? `${data.author.substring(0, 50)}...` : data.author
  
  $: missingDependencies = $state.modList.filter(mod => (
    !mod.checked && data.deps && data.deps.includes(mod.id)
  )).map (mod => mod.id)
  $: error = data.checked && missingDependencies.length > 0
  $: selected = data.checked
</script>

<div use:cull on:cull={handleCull} class:selected class:error on:click={handleClick}>
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
    {#if error}
      <span class="missing">
        Missing:
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
      on:click={() => {
        openDetails(data.id)
      }}
      name="chevron-right"/>
  {/if}
</div>

<style>
  div {
    display: flex;
    color: var(--grey-100);
    border-radius: 0.5em;
    border: 2px solid transparent;
    background-color: var(--grey-500);
    padding: 0.5em 1em;
    gap: 1em;
    align-items: center;
    cursor: pointer;
    transition: border 500ms, transform 200ms;
    min-height: 44px;
  }

  div.error {
    border: 2px solid var(--red-500) !important;
  }

  div:hover {
    border: 2px solid var(--grey-100);
    transform: scale(1.02);
  }

  .selected {
    border: 2px solid var(--primary-700) !important;
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