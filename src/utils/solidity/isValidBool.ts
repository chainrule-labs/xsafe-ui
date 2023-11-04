export const isValidBool = (value: string): boolean =>
	/^(true|false)$/.test(value);
