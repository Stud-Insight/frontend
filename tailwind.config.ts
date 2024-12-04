import colorPalette from './src/lib/utils/colorPalette';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			backgroundImage: {
				'hero-pattern': "url('/hero-pattern.svg')",
				'cas-logo': "url('/cas-logo.png')"
			}
		},
		colors: {
			'white': '#ffffff',
			'black': '#000000',
			'deep-blue': colorPalette.deepBlue,
			'blue': colorPalette.blue,
			'cyan': colorPalette.cyan,
			'dark-gray': colorPalette.darkGray,
			'gray': colorPalette.gray,
			'light-gray': colorPalette.lightGray,
			'red': colorPalette.red,
			'green': colorPalette.green,
			'yellow': colorPalette.yellow,
			'orange': colorPalette.orange,
		}
	},

	plugins: []
} satisfies Config;
