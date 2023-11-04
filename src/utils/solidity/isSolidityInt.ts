export const isSolidityInt = (argType: string): boolean =>
	argType.includes("int") && !argType.includes("[]");
