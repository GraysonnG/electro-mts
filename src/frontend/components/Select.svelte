<script>
  export let items = []
  export let value
</script>

<div>
  <select bind:value>
    {#each items as item}
      <option value={item}>{item}</option>
    {/each}
  </select>
</div>

<style>
  select {
    width: 100%;
    height: 100%;
    padding: 0.5em 3em;
    padding-left: 1em;
    border: 2px solid var(--primary-700);
    border-radius: 0.25em;
    background-color: transparent;
    appearance: none;
    color: var(--grey-100);
    
  }

  div:hover {
    transform: scale(1.05);
  }

  div {
    transition: transform 250ms;
    position: relative;
  }

  div::after {
    content: "";
    display: block;
    position: absolute;
    border-bottom: 2px solid var(--grey-100);
    border-right: 2px solid var(--grey-100);
    border-radius: 1px;
    box-sizing: border-box;
    transform: rotate(45deg) translate(-7%, -10%);
    transform-origin: center center;
    transition: transform 200ms;
    right: 1em;
    top: calc(50% - 5px);
    width: 11px;
    height: 11px;
  }
</style>