export abstract class IDeployService {
	abstract getAddress(
		bytecode: string,
		setExpectedAddress: (value: `0x${string}`) => void
	): Promise<void>;

	abstract getDeploymentHistory(
		setDeployedContracts: (value: string[]) => void
	): Promise<void>;

	abstract sign(
		setIsLoading: (value: boolean) => void,
		bytecode: string,
		setSignature: (value: string) => void,
		setSuccessfulSignature: (value: boolean) => void,
		setErrorMessage: (value: string) => void
	): Promise<void>;

	abstract deploy(
		setIsLoading: (value: boolean) => void,
		signature: string,
		bytecode: string,
		constructorArgsBytecode: string,
		setTxHash: (value: `0x${string}`) => void,
		setSuccessfulDeployment: (value: boolean) => void,
		setSuccessfulSignature: (value: boolean) => void,
		setErrorMessage: (value: string) => void
	): Promise<void>;
}
