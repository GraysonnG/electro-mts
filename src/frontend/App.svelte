<script>
	import Footer from "./components/Footer.svelte"
	import List from "./components/List.svelte"
	import StsPrompt from "./modals/StsPrompt.svelte"
</script>

<main>
	<div>
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
		background-color:var(--grey-900);
	}
</style>