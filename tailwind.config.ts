import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundImage: {
				'hero-pattern': "url('hero-pattern.svg')",
			},
		}
	},

	plugins: []
} satisfies Config;
