/* eslint-disable no-use-before-define */
import create3factoryAbi from "../abis/create3factory.json";
import { CREATE3_FACTORY } from "../data/constants";
import { IDeployService } from "../interfaces";
import {
	readContract,
	signMessage,
	waitForTransaction,
	writeContract,
} from "../resources";
import store from "../state/store";

/**
 * The singleton class pattern defines a `getInstance` method so that
 * the single class instance can be accessed elsewhere in the project.
 */
class DeployService extends IDeployService {
	private static instance: DeployService;

	private constructor() {
		super();
	}

	public static getInstance(): DeployService {
		if (!DeployService.instance) {
			DeployService.instance = new DeployService();
		}
		return DeployService.instance;
	}

	// ***************************************** Methods ***************************************** //
	public async getAddress(
		bytecode: string,
		setExpectedAddress: (value: `0x${string}`) => void
	): Promise<void> {
		const principal = store.getState().wallet.address;

		const contractAddress = (await readContract({
			address: CREATE3_FACTORY,
			abi: create3factoryAbi,
			functionName: "getAddress",
			args: [principal, bytecode as `0x${string}`],
		})) as `0x${string}`;

		setExpectedAddress(contractAddress);
	}

	public async getDeploymentHistory(
		setDeployedContracts: (value: string[]) => void
	): Promise<void> {
		const principal = store.getState().wallet.address;

		const contractAddresses = (await readContract({
			address: CREATE3_FACTORY,
			abi: create3factoryAbi,
			functionName: "getDeploymentHistory",
			args: [principal],
		})) as string[];

		setDeployedContracts(contractAddresses);
	}

	public async sign(
		setIsLoading: (value: boolean) => void,
		bytecode: string,
		setSignature: (value: string) => void,
		setSuccessfulSignature: (value: boolean) => void,
		setErrorMessage: (value: string) => void
	): Promise<void> {
		setIsLoading(true);
		setErrorMessage("");

		const principal = store.getState().wallet.address;

		try {
			const transactionHash = (await readContract({
				address: CREATE3_FACTORY,
				abi: create3factoryAbi,
				functionName: "getTransactionHash",
				args: [principal, bytecode],
			})) as `0x${string}`;

			const signature = await signMessage({
				message: {
					raw: transactionHash,
				} as unknown as string,
			});

			if (signature) {
				setSignature(signature);
				setSuccessfulSignature(true);
			} else {
				setErrorMessage("Error signing message hash.");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const acceptableErrorMessages = [
				"rejected",
				"request reset",
				"denied",
			];

			if (
				!acceptableErrorMessages.some((msg) =>
					error.message.includes(msg)
				)
			) {
				setErrorMessage(`Error signing message hash: ${error}`);
			}
		}
		setIsLoading(false);
	}

	public async deploy(
		setIsLoading: (value: boolean) => void,
		signature: string,
		bytecode: string,
		constructorArgsBytecode: string,
		setTxHash: (value: `0x${string}`) => void,
		setSuccessfulDeployment: (value: boolean) => void,
		setSuccessfulSignature: (value: boolean) => void,
		setErrorMessage: (value: string) => void
	): Promise<void> {
		setIsLoading(true);
		setErrorMessage("");

		try {
			const principal = store.getState().wallet.address;

			const { hash } = await writeContract({
				address: CREATE3_FACTORY,
				abi: create3factoryAbi,
				functionName: "deploy",
				args: [principal, signature, bytecode, constructorArgsBytecode],
			});

			const txReceipt = await waitForTransaction({
				hash,
			});

			if (txReceipt.status === "success") {
				setTxHash(txReceipt.transactionHash);
				setSuccessfulDeployment(true);
				setSuccessfulSignature(false);
			} else {
				setErrorMessage("Something went wrong trying to deploy.");
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			const acceptableErrorMessages = [
				"rejected",
				"request reset",
				"denied",
			];

			if (
				!acceptableErrorMessages.some((msg) =>
					error.message.includes(msg)
				)
			) {
				setErrorMessage(`Error deploying contract: ${error}`);
			}
		}
		setIsLoading(false);
	}
	// ******************************************************************************************* //
}

export default DeployService;
