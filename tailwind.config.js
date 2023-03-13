/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			xxs: "320px",
			xs: "425px",
			...defaultTheme.screens,
		},
		extend: {
			screens: {
				"3xl": "1728px",
			},
			colors: {
				custom: {
					black: { text: "#141414" },
					navy: "#023343",
					green: {
						"green-bright": "#00d9bf",
						"accent-green": "#07f0c1",
						"logo-green": "#36C7B5",
						"darker-green": "#21AD9C"
					},
				},
				logo: {
					white: "#f5fcfc",
					black: "#020504",
					green: "#36c7b5",
				},
			},
			fontFamily: {
				sans: ["Readex Pro", "Urbanist", ...defaultTheme.fontFamily.sans],
				readex: "Readex Pro, sans-serif",
				urbanist: "Urbanist, sans-serif",
			},
		},
	},
	plugins: [],
};
