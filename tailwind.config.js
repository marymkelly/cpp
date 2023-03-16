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
						bright: "#00d9bf",
						accent: "#07f0c1",
						logo: "#36C7B5",
						darker: "#21AD9C",
					},
					gray: {
						"input-border": "#CCd6d9",
						"input-text": "#879CA3",
						"blue-mid": "#7096A0",
					},
					red: {
						error: "#F18E8E",
						"error-hover": "#DA6161",
						"dark-rust": "#B65656",
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
	plugins: [require("./lib/headersPlugin")],
};
