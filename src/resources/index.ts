export type { EIP1193Provider, WalletClient } from "./blockchainInterface";
export {
	formatUnits,
	isAddress,
	isHex,
	parseUnits,
} from "./blockchainInterface";
export { getChain } from "./getChain";
export {
	connect,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	readContract,
	signMessage,
	switchNetwork,
	waitForTransaction,
	walletConfig,
	watchAccount,
	watchNetwork,
	writeContract,
} from "./walletInterface";
