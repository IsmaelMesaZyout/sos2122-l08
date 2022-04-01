import App from './App.svelte';

const app = new App({ //objeto creado a partir de la clase svelte
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;