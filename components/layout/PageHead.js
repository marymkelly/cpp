import Head from "next/head";

export default function PageHead() {
	return (
		<Head>
			<title>Saga - Creative Process Management Platform</title>
			<meta
				name='description'
				content='Web application to help manage your creative process'
			/>
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<meta name='color-scheme' content='light dark' />
			<meta name='theme-color' media='(prefers-color-scheme: light)' content='#f5fcfc' />
			<meta name='theme-color' media='(prefers-color-scheme: dark)' content='#020504' />
			<link rel='icon' href='/favicon/favicon.svg' type='image/svg+xml' />
			<link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
			<link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
			<link rel='manifest' href='/favicon/site.webmanifest' />
		</Head>
	);
}
