/* eslint-disable no-use-before-define */
import { IDeployService } from "../interfaces/services/deploy";

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
	public async sign(setIsLoading: (value: boolean) => void): Promise<void> {
		setIsLoading(true);

		try {
			// 1. Need user's address
			// 2. Call userNonces()
			// 3. Call getTransactionHash() with address and nonce as args
			// 4. Prompt user to sign the returned txHash
			//
			//
			// NOTE: Steps 1-4 may need to be moved to deploy(), which means this
			//       function may go away, depending on user flow testing.
			//
			//
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			// eslint-disable-next-line no-console
			console.error("\nError deploying child contract:\n", error);
		}
		setIsLoading(false);
	}

	public async deploy(setIsLoading: (value: boolean) => void): Promise<void> {
		setIsLoading(true);

		try {
			// 1. Need user's address, signature, and bytecode
			// 2. Call deploy() with address, signature, and bytecode as args
			// 3. Update children global state
			//
			//
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			// eslint-disable-next-line no-console
			console.error("\nError deploying child contract:\n", error);
		}
		setIsLoading(false);
	}
	// ******************************************************************************************* //
}

export default DeployService;
