export type ArgumentValue =
	| string
	| string[]
	| bigint
	| bigint[]
	| boolean
	| boolean[];

export type Argument = {
	id: string;
	type: string;
	value: ArgumentValue | null;
	isValid: boolean;
};
