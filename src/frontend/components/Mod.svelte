<script>
import { createEventDispatcher } from "svelte";

  import Checkbox from "./Checkbox.svelte";

  export let data;

  const dispatch = createEventDispatcher()
  const handleClick = (e) => {
    const source = e.path[0]
    if (source.tagName !== "INPUT") {
      dispatch('click', {
        modId: data.id,
        event: e
      })
    }
  }

  let authorString = data.author.length > 50 ? `${data.author.substring(0, 50)}...` : data.author

  $: selected = data.checked
</script>

<div class:selected on:click={handleClick}>
  <border></border>
  <Checkbox bind:checked={selected} id={data.id} />
  <span>{data.name}</span>
  <span class="small">({data.version})</span>
  <span class="small grow">by: {authorString}</span>
  
</div>

<style>
  div {
    display: flex;
    color: white;
    border-radius: 0.5em;
    border: 2px solid transparent;
    background-color: var(--grey-500);
    padding: 0.5em 1em;
    gap: 1em;
    align-items: center;
    cursor: pointer;
    transition: border 500ms;
  }

  div:hover {
    border: 2px solid var(--grey-100);
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
</style>