import { SupportedChain } from "../interfaces";

export const chainList: SupportedChain[] = [
	// ********** Ethereum ********** //
	{
		name: "Ethereum",
		imageSource: "/images/iconEthereum.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://etherscan.io",
		chainId: 1,
	},
	// ********** Optimism ********** //
	{
		name: "Optimism",
		imageSource: "/images/iconOptimism.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://optimistic.etherscan.io",
		chainId: 10,
	},
	// ********** Polygon ********** //
	{
		name: "Polygon",
		imageSource: "/images/iconPolygon.svg",
		nativeCurrency: {
			symbol: "MATIC",
			decimals: 18,
		},
		blockExplorer: "https://polygonscan.com",
		chainId: 137,
	},
	// ********** Sepolia ********** //
	{
		name: "Sepolia",
		imageSource: "/images/iconEthereum.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://sepolia.etherscan.io",
		chainId: 11155111,
	},
	// ********** Optimism Sepolia ********** //
	{
		name: "Optimism Sepolia",
		imageSource: "/images/iconOptimism.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://sepolia-optimism.etherscan.io",
		chainId: 11155420,
	},
	// ********** Polygon Mumbai ********** //
	{
		name: "Polygon Mumbai",
		imageSource: "/images/iconPolygon.svg",
		nativeCurrency: {
			symbol: "MATIC",
			decimals: 18,
		},
		blockExplorer: "https://mumbai.polygonscan.com",
		chainId: 80001,
	},
	// ********** Arbitrum One ********** //
	{
		name: "Arbitrum One",
		imageSource: "/images/iconArbitrumOne.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://arbiscan.io",
		chainId: 42161,
	},
	// ********** Base ********** //
	{
		name: "Base",
		imageSource: "/images/iconBase.svg",
		nativeCurrency: {
			symbol: "ETH",
			decimals: 18,
		},
		blockExplorer: "https://basescan.org",
		chainId: 8453,
	},
	// ********** BNB Smart Chain ********** //
	{
		name: "BNB Smart Chain",
		imageSource: "/images/iconBsc.svg",
		nativeCurrency: {
			symbol: "BNB",
			decimals: 18,
		},
		blockExplorer: "https://bscscan.com",
		chainId: 56,
	},
	// ********** Avalanche C-Chain ********** //
	{
		name: "Avalanche C-Chain",
		imageSource: "/images/iconAvalanche.svg",
		nativeCurrency: {
			symbol: "AVAX",
			decimals: 18,
		},
		blockExplorer: "https://snowtrace.io",
		chainId: 43114,
	},
	// ********** Celo ********** //
	{
		name: "Celo",
		imageSource: "/images/iconCelo.svg",
		nativeCurrency: {
			symbol: "CELO",
			decimals: 18,
		},
		blockExplorer: "https://celoscan.io",
		chainId: 42220,
	},
	// ********** Gnosis ********** //
	{
		name: "Gnosis",
		imageSource: "/images/iconGnosis.svg",
		nativeCurrency: {
			symbol: "XDAI",
			decimals: 18,
		},
		blockExplorer: "https://gnosisscan.io",
		chainId: 100,
	},
	// ********** Fantom ********** //
	{
		name: "Fantom",
		imageSource: "/images/iconFantom.svg",
		blockExplorer: "https://ftmscan.com",
		nativeCurrency: {
			symbol: "FTM",
			decimals: 18,
		},
		chainId: 250,
	},
];
