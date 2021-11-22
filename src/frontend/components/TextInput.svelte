<script>
  import { createEventDispatcher } from "svelte";

  export let placeholder = undefined
  export let value
  export let small = false
  export let main = false

  const dispatch = createEventDispatcher()

  const handleOnChange = (e) => {
    dispatch('change', e)
  }
  
</script>

<input class:small class:main {placeholder} type="text" bind:value on:change={handleOnChange}/>

<style>
  input {
    background-color: transparent;
    border: 2px solid var(--grey-100);
    border-radius: 0.25em;
    padding: 0.5em 1em;
    width: 100%;
    color: var(--grey-100);
    font-size: 1.2em;
    font-weight: 100;
    outline: none;
  }

  input::placeholder {
    color: var(--grey-100);
    opacity: 0.33;
  }

  input.small {
    font-size: 1em;
  }

  input.main {
    border: 1px solid transparent;
    background-color: var(--grey-500);
  }


  input:focus {
    background-color: var(--grey-500);
    border-color: var(--primary-500);
  }
</style>