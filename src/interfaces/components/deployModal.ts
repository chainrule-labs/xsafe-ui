import { SupportedChain } from "../data/chains";

export interface IDeployModal {
	isOpen: boolean;
	closeModal: () => void;
	chain: SupportedChain;
}
