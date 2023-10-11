/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
});

module.exports = withPWA({
	reactStrictMode: true,
	env: {
		// ********* PRIVATE ********* //
		PRIVATE_ETHEREUM_RPC: process.env.PRIVATE_ETHEREUM_RPC,
		PRIVATE_OPTIMISM_RPC: process.env.PRIVATE_OPTIMISM_RPC,
		PRIVATE_ARBITRUM_ONE_RPC: process.env.PRIVATE_ARBITRUM_ONE_RPC,
		PRIVATE_POLYGON_RPC: process.env.PRIVATE_POLYGON_RPC,
		PRIVATE_GNOSIS_RPC: process.env.PRIVATE_GNOSIS_RPC,
		PRIVATE_CELO_RPC: process.env.PRIVATE_CELO_RPC,
		PRIVATE_AVALANCHE_RPC: process.env.PRIVATE_AVALANCHE_RPC,
		PRIVATE_FANTOM_RPC: process.env.PRIVATE_FANTOM_RPC,
		PRIVATE_BSC_RPC: process.env.PRIVATE_BSC_RPC,
		PRIVATE_AURORA_RPC: process.env.PRIVATE_AURORA_RPC,
		PRIVATE_BASE_RPC: process.env.PRIVATE_BASE_RPC,
		PRIVATE_BASE_GOERLI_RPC: process.env.PRIVATE_BASE_GOERLI_RPC,
		PRIVATE_GOERLI_RPC: process.env.PRIVATE_GOERLI_RPC,
		WC_PROJECT_ID: process.env.WC_PROJECT_ID,
		ADMIN_EMAIL: process.env.ADMIN_EMAIL,

		// ********* PUBLIC ********* //
		APP_URL: "https://xsafe.dev",
	},
});
