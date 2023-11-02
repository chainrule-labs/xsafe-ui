import { Argument } from "../data/arguments";
import { SupportedChain } from "../data/chains";
import { Balance } from "../state/wallet";

export interface IDeployModal {
	isOpen: boolean;
	closeModal: () => void;
	chain: SupportedChain;
	bytecode: string;
	argumentList: Argument[] | null;
	setDeployedContracts: (value: string[]) => void;
	nativeBalance: Balance;
}
