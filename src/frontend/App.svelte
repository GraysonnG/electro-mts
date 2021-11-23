<script>
	import Footer from "./components/Footer.svelte"
	import List from "./components/List.svelte"
	import StsPrompt from "./modals/StsPrompt.svelte"
	import ModInfo from "./modals/ModInfo.svelte";
	import { state } from "./state/store"
	import GlobalCSS from "./styles/GlobalCSS.svelte";
	import GenericError from "./modals/GenericError.svelte";
	import LoadingCircle from "./components/LoadingCircle.svelte";
	import Header from "./components/Header.svelte";
	import TitleBar from "./components/TitleBar.svelte";
	import Tooltip from "./components/Tooltip.svelte";

	window.launcher.init()
</script>

<GlobalCSS />

<TitleBar />
<Header />

<main>
	<div>
		{#if !$state.loading}
			<List />
		{:else}
			<section>
				<p>Loading...</p>
				<LoadingCircle />
			</section>
		{/if}
	</div>
</main>
<Footer />

<GenericError />
<ModInfo />
<StsPrompt />
<Tooltip />

<style>
	main {
		background-color: var(--grey-900);
		flex: 1;
		width: 100%;
		display: grid;
		grid-template-rows: 1fr 4em;
		overflow: auto;
		position: relative;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
		color: var(--grey-100);
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