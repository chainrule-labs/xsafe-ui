export const isSolidityIntArray = (argType: string): boolean =>
	argType.includes("int") && argType.includes("[]");
