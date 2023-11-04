import { isAddress } from "../../resources";

export const isValidAddressArray = (value: string): boolean => {
	if (!/^\[.*\]$/.test(value.trim())) {
		return false;
	}
	const elements = value.slice(1, -1).split(/\s*,\s*/);
	return elements.every((element) => isAddress(element.trim()));
};
