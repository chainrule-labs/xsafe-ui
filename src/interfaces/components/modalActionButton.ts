export interface IModalActionButton {
	action: () => Promise<void>;
	label: string;
	isLoading?: boolean;
	bytecode: string;
	errorMessage: string;
}
