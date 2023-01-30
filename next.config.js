/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "**.githubusercontent.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	env: {
		GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
		GOOGLE_AUTH_DOMAIN: process.env.GOOGLE_AUTH_DOMAIN,
		GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
		GOOGLE_STORAGE_BUCKET: process.env.GOOGLE_STORAGE_BUCKET,
		GOOGLE_MESSAGING_SENDER_ID: process.env.GOOGLE_MESSAGING_SENDER_ID,
		GOOGLE_APP_ID: process.env.GOOGLE_APP_ID,
		GOOGLE_MEASUREMENT_ID: process.env.GOOGLE_MEASUREMENT_ID,
		MONGODB_USER: process.env.MONGODB_USER,
		MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
		MONGODB_DATABASE: process.env.MONGODB_DATABASE,
		REALM_APP_ID: process.env.REALM_APP_ID,
		GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
		GITHUB_SECRET: process.env.GITHUB_SECRET,
	},
};

module.exports = nextConfig;
