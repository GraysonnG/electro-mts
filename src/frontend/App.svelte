<script>
import { onMount } from "svelte";

	import Footer from "./components/Footer.svelte"
	import List from "./components/List.svelte"
	import TextInput from "./components/TextInput.svelte"
	import StsPrompt from "./modals/StsPrompt.svelte"
	import { state } from "./state/store"
	

	onMount(() => {
		window.launcher.init()
	})
</script>

<main>
	<div>
		<TextInput bind:value={$state.filter} placeholder="Search Installed Mods..." />
		<List />
	</div>
	<Footer />
</main>

<StsPrompt />

<style>
	main {
		height: 100vh;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr 4em;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
		background-color:var(--grey-900);
	}
</style>