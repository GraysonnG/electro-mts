<script>
	import Footer from "./components/Footer.svelte";
	import List from "./components/List.svelte";
	import { state } from "./state/store";
	import GlobalCSS from "./styles/GlobalCSS.svelte";
	import LoadingCircle from "./components/LoadingCircle.svelte";
	import Header from "./components/Header.svelte";
	import TitleBar from "./components/TitleBar.svelte";
	import Tooltip from "./components/Tooltip.svelte";
	import Modals from "./modals/Modals.svelte";
	import EvaIcon from "./components/EvaIcon.svelte";
	import { fly } from "svelte/transition";

	let main;
	let showUpButton = false
	let goUp = () => {
		main?.scrollTo({ top: 0, behavior: 'smooth' });
	}
	
	let onScroll = (e) => {
		showUpButton = e.target.scrollTop !== 0
	}

</script>

<GlobalCSS />
<TitleBar />
<Header />
<main bind:this={main} on:scroll={onScroll}>
	{#if !$state.loading}
		<List />
	{:else}
		<section>
			<p>Loading...</p>
			<LoadingCircle />
		</section>
	{/if}
</main>
{#if showUpButton}
	<div on:click={goUp} transition:fly={{ y: -20 }}>
		<EvaIcon name="arrowhead-up-outline" size={32}/>
	</div>
{/if}
<Footer />
<Modals />
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

	div {
		position: absolute;
		left: 50%;
		top: 7em;
		padding: 0.5em;
		background-color: var(--grey-300);
		box-shadow: 0 0 15px var(--grey-900);
		border-radius: 0.25em;
		border: 2px solid var(--primary-500);
		transform: translateX(-50%);
		cursor: pointer;
		z-index: 10002;
	}
</style>