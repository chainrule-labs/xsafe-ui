import { SupportedChain } from "../data/chains";
import { Balance, Network } from "../state/wallet";

export interface IDeployButton {
	chain: SupportedChain;
	isWalletConnected: boolean;
	currentNetwork: Network;
	nativeBalance: Balance;
	bytecode: string;
	openModal: (value: SupportedChain) => void;
	homeErrorMessage: string;
	setHomeErrorMessage: (value: string) => void;
}
