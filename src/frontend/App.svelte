<script>
	import Footer from "./components/Footer.svelte"
	import List from "./components/List.svelte"
</script>

<main>
	<div>
		<List />
	</div>
	<Footer></Footer>
</main>

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