import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({
	theme: "",
	setTheme: function (string) {},
});

export function ThemeContextProvider(props) {
	const [currentTheme, setCurrentTheme] = useState("light");

	useEffect(() => {
		const deviceTheme = window.matchMedia(`(prefers-color-scheme:light)`);

		function handleChange(e) {
			e.matches ? setTheme("light") : setTheme("dark");
		}

		handleChange(deviceTheme);

		deviceTheme.addEventListener("change", handleChange);

		return () => {
			deviceTheme.removeEventListener("change", handleChange);
		};
	}, []);

	function setTheme(theme) {
		setCurrentTheme(theme);
	}

	const context = {
		theme: currentTheme,
		setTheme,
	};

	return <ThemeContext.Provider value={context}>{props.children}</ThemeContext.Provider>;
}

export default ThemeContext;
