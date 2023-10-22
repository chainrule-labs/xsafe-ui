import { SupportedChain } from "../data/chains";
import { Network } from "../state/wallet";

export interface IDeployButton {
	chain: SupportedChain;
	isWalletConnected: boolean;
	currentNetwork: Network;
	openModal: (value: SupportedChain) => void;
}
