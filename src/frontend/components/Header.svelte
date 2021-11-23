<script>
  import TextInput from "./TextInput.svelte";
  import EvaIcon from "./EvaIcon.svelte";
  import { state } from "../state/store";

  const handleRefresh = () => {

  }
</script>

<header>
  <div>
    <EvaIcon
      name="refresh-outline"
      size=24
      on:click={handleRefresh}
    />
  </div>
  
  <TextInput main bind:value={$state.filter} placeholder="Search Name, Author, and Tags..." />

  <div>
    <EvaIcon
      name="settings-outline"
      size=24
    />
  </div>
</header>

<style>
  header {
		display: flex;
		gap: 1em;
		padding: 1em;
		align-items: center;
    background-color: var(--grey-900);
    box-shadow: 0 0 15px var(--grey-900);
    z-index: 1;
	}

  div {
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 0.5em;
    padding: 0.4em 0.5em;
    transition: border 300ms;
  }

  div > :global(*) {
    transition: transform 300ms;
  }

  div:hover {
    border-color: var(--grey-500);
  }

  div:hover > :global(*) {
    transform: rotate(33deg);
  }
</style>