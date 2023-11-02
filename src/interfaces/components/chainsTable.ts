import { Argument } from "../data/arguments";
import { SupportedChain } from "../data/chains";
import { Balance, Network } from "../state/wallet";

export interface IChainsTable {
	chainList: SupportedChain[];
	isWalletConnected: boolean;
	currentNetwork: Network;
	nativeBalance: Balance;
	bytecode: string;
	argumentList: Argument[] | null;
	openModal: (value: SupportedChain) => void;
	homeErrorMessage: string;
	setHomeErrorMessage: (value: string) => void;
}
