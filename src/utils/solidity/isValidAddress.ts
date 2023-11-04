import { isAddress } from "../../resources";

export const isValidAddress = (value: string): boolean => isAddress(value);
