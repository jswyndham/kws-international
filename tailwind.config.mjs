/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	safelist: [
		// Add any other dynamic gradient colors you plan to use
	],
	theme: {
		extend: {
			screens: {
				'3xl': '1920px',
				'4xl': '2560px',
			},
			colors: {},
			fontFamily: {
				display: ['Oswald', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
				hanken: ['Hanken Grotesk', 'sans-serif'],
			},
			fontSize: {
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
			},
			maxWidth: {
				'3xl': '48rem',
				'4xl': '56rem',
				'5xl': '64rem',
				'6xl': '72rem',
				'7xl': '80rem',
			},
		},
	},
	plugins: [],
};
