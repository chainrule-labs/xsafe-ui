export const isSolidityBytesArray = (argType: string): boolean =>
	argType.includes("bytes") && argType.includes("[]");
