export type { EIP1193Provider, WalletClient } from "./blockchainInterface";
export {
	formatUnits,
	isAddress,
	parseUnits,
	zeroAddress,
} from "./blockchainInterface";
export {
	connect,
	disconnect,
	fetchBalance,
	fetchEnsAvatar,
	fetchEnsName,
	getWalletClient,
	readContract,
	switchNetwork,
	waitForTransaction,
	walletConfig,
	watchAccount,
	watchNetwork,
	writeContract,
} from "./walletInterface";
