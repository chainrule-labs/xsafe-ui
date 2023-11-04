export const isSolidityBytes = (argType: string): boolean =>
	argType.includes("bytes") && !argType.includes("[]");
