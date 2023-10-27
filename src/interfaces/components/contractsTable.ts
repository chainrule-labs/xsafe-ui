import { Network } from "../state/wallet";

export interface IContractsTable {
	deployedContracts: string[];
	currentNetwork: Network;
}
