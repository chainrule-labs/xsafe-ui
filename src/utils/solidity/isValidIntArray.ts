import { isValidInt } from "./isValidInt";

export const isValidIntArray = (value: string): boolean => {
	if (!/^\[.*\]$/.test(value.trim())) {
		return false;
	}
	const elements = value.slice(1, -1).split(/\s*,\s*/);
	return elements.every((element) => isValidInt(element.trim()));
};
