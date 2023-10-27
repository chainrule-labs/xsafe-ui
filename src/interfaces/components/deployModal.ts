import { SupportedChain } from "../data/chains";
import { Balance } from "../state/wallet";

export interface IDeployModal {
	isOpen: boolean;
	closeModal: () => void;
	chain: SupportedChain;
	bytecode: string;
	setDeployedContracts: (value: string[]) => void;
	nativeBalance: Balance;
}
