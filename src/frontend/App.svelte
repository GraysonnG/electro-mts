<script>
	import Footer from "./components/Footer.svelte"
	import List from "./components/List.svelte"
	import TextInput from "./components/TextInput.svelte"
	import StsPrompt from "./modals/StsPrompt.svelte"
	import ModInfo from "./modals/ModInfo.svelte";
	import { state } from "./state/store"
	import GlobalCSS from "./styles/GlobalCSS.svelte";
	import GenericError from "./modals/GenericError.svelte";

	window.launcher.init()
</script>

<GlobalCSS />

<main>
	<div>
		<TextInput bind:value={$state.filter} placeholder="Search Installed Mods..." />
		<List />
	</div>
	<Footer />
</main>

<GenericError />
<ModInfo />
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