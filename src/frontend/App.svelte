<script>
	import Footer from "./components/Footer.svelte"
	import List from "./components/List.svelte"
	import TextInput from "./components/TextInput.svelte"
	import StsPrompt from "./modals/StsPrompt.svelte"
	import ModInfo from "./modals/ModInfo.svelte";
	import { state } from "./state/store"
	import GlobalCSS from "./styles/GlobalCSS.svelte";
	import GenericError from "./modals/GenericError.svelte";
	import EvaIcon from "./components/EvaIcon.svelte";
	import LoadingCircle from "./components/LoadingCircle.svelte";

	window.launcher.init()
</script>

<GlobalCSS />

<main>
	<div>
		<header>
			<EvaIcon
				name="refresh-outline"
				size=24
			/>

			<EvaIcon
				name="options-2-outline"
				size=24
			/>
			
			<TextInput bind:value={$state.filter} placeholder="Search Installed Mods..." />

			<EvaIcon
				name="settings-outline"
				size=24
			/>
		</header>
		{#if !$state.loading}
			<List />
		{:else}
			<section>
				<p>Loading...</p>
				<LoadingCircle />
			</section>
		{/if}
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
		background-color: var(--grey-900);
		color: var(--grey-100);
	}

	header {
		display: flex;
		gap: 1em;
		padding: 0 0.5em;
		align-items: center;
	}

	section {
		display: flex;
		gap: 0.5em;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	section p {
		font-weight: bold;
	}
</style>