<script>
  import { createEventDispatcher } from "svelte";

  export let placeholder = undefined
  export let value

  const dispatch = createEventDispatcher()

  const handleOnChange = (e) => {
    console.log(e)
    dispatch('change', e)
  }
  
</script>

<input {placeholder} type="text" bind:value on:change={handleOnChange}/>

<style>
  input {
    background-color: transparent;
    border: 2px solid var(--grey-100);
    border-radius: 0.5em;
    padding: 0.5em 1em;
    width: 100%;
    color: var(--grey-100);
    font-size: 1.2em;
    outline: none;
  }

  input:focus {
    border-color: var(--primary-700);
  }
</style>