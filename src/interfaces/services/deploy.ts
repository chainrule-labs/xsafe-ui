export abstract class IDeployService {
	abstract sign(setIsLoading: (value: boolean) => void): Promise<void>;

	abstract deploy(setIsLoading: (value: boolean) => void): Promise<void>;
}
