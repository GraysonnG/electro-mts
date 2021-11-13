<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import Checkbox from "./Checkbox.svelte";
  import Button from "./Button.svelte";
  import EvaIcon from "./EvaIcon.svelte";
  import FavoriteButton from "./FavoriteButton.svelte";
  import { openDetails, setLaunchEnabled, state, toggleMod } from "../state/store";

  export let data;

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

  let authorString = data.author.length > 50 ? `${data.author.substring(0, 50)}...` : data.author
  let error = false
  let missingDependencies = []

  onMount(() => {
    state.subscribe(s => {
      error = false
      missingDependencies = []
      if (data.deps && data.checked) {
        s.modList.forEach(mod => {
            data.deps.forEach(dep => {
            if (mod.id === dep && !mod.checked) {
              missingDependencies.push(mod.id)
              error = true
            }
          });
        })
      }
    })
  })

  $: selected = data.checked
</script>

<div class:selected class:error on:click={handleClick}>
  <Checkbox bind:checked={selected} id={data.id} />
  <span>{data.name}</span>
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

  <FavoriteButton on:favorite={handleFavorite} bind:enabled={data.favorited} />

  <EvaIcon
    color="var(--grey-100)"
    on:click={() => {
      openDetails(data.id)
    }}
    name="chevron-right"/>
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