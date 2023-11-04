import { isHex } from "../../resources";

export const isValidBytes = (value: string): boolean => isHex(value);
