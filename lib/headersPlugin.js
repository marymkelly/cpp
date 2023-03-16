const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addUtilities, matchUtilities, theme, e }) => {
	const flattenTheme = (theme, opts) => {
		return Object.keys(theme).reduce((acc, key) => {
			const value = theme[key];
			if (typeof value === "object") {
				return Object.assign(
					acc,
					flattenTheme(value, {
						prefix: `${opts?.prefix ?? ""}${key}${opts?.separator ?? "-"}`,
						separator: opts?.separator ?? "-",
					})
				);
			} else if (typeof value === "string" || typeof value === "number") {
				return Object.assign(acc, { [`${opts?.prefix ?? ""}${key}`]: value });
			} else {
				return acc;
			}
		}, {});
	};

	const twColors = flattenTheme({ ...theme("colors") });
    const twFontWeight = flattenTheme({ ...theme("fontWeight") });

	const baseUtilities = {
		".h1": {
			"h1": { fontSize: theme("fontSize.2xl") },
		},
		".h2": {
			"h2": { fontSize: theme("fontSize.xl") },
		},
		".h3": {
			"h3": { fontSize: theme("fontSize.lg") },
		},
		".h4": {
			"h4": { fontSize: theme("fontSize.base") },
		},
		".h5": {
			"h5": { fontSize: theme("fontSize.sm") },
		},
		".h6": {
			"h6": { fontSize: theme("fontSize.xs") },
		},
		".p": {
			"p": { fontSize: theme("fontSize.base") },
		},
	};

	Object.keys(baseUtilities).forEach((className) => {
		const el = className.slice(1);

		Object.entries(twColors).reduce(
			(acc, [key, value]) =>
				Object.assign(acc, {
					[`.${e(`${el}-${key}`)}`]: {
						[`& ${el}`]: {
							color: `${value}`,
						},
					},
				}),
			baseUtilities
		);

        Object.entries(twFontWeight).reduce(
			(acc, [key, value]) =>
				Object.assign(acc, {
					[`.${e(`${el}-${key}`)}`]: {
						[`& ${el}`]: {
							fontWeight: `${value}`,
						},
					},
				}),
			baseUtilities
		);
	});

	addUtilities(baseUtilities);


    const dynamicBaseUtility = {}

    Object.keys(baseUtilities).forEach((className) => {
        const el = className.slice(1);

        Object.assign(dynamicBaseUtility, {
            [el]:  (value) => {
                return {
                    [`& ${el}`]: {
                        fontSize: value,
                    },
                };
            }
        })
	});

	matchUtilities(dynamicBaseUtility, { values: theme("fontSize") });
});
