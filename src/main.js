// This is for the Svelte frontend
import App from './frontend/App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;