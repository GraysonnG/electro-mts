<script>
	import Footer from "./components/Footer.svelte"
</script>

<main>
	<div>
	</div>
	<Footer></Footer>
</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		display: grid;
		grid-template-rows: 1fr 4em;
	}

	div {
		background-color: red;
	}
</style>