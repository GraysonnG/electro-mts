// This is for the Svelte frontend
import App from './App.svelte';

const app = new App({
	target: document.body,
});

window.launcher.init()

export default app;