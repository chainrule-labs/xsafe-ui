import { isHex } from "../../resources";

export const isValidBytesArray = (value: string): boolean => {
	if (!/^\[.*\]$/.test(value.trim())) {
		return false;
	}
	const elements = value.slice(1, -1).split(/\s*,\s*/);
	return elements.every((element) => isHex(element.trim()));
};
