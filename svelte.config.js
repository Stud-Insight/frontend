import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$pages: 'src/pages',
			$utils: 'src/lib/utils',
		}
	},
	/* optimizeDeps: {
		exclude: ['SuperDebug']
	}, */
};

export default config;
