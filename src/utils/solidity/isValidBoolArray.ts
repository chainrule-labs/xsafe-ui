import { isValidBool } from "./isValidBool";

export const isValidBoolArray = (value: string): boolean => {
	if (!/^\[.*\]$/.test(value.trim())) {
		return false;
	}
	const elements = value.slice(1, -1).split(/\s*,\s*/);
	return elements.every((element) => isValidBool(element.trim()));
};
