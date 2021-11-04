<script>
  import Checkbox from "./Checkbox.svelte";

  export let data;
  export let selected = false;

  const handleClick = (e) => {
    let shouldToggle = true

    e.path.forEach(element => {
      if (element.tagName && element.tagName.toLowerCase() === "element") shouldToggle = false
    });

    if (shouldToggle) {
      selected = !selected
    }
  }
</script>

<div class:selected on:click={handleClick}>
  <Checkbox bind:checked={selected} id={data.id} />
  <span>ModName</span>
  <span class="small">(0.0.0)</span>
  <span class="small grow">by: Author</span>
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