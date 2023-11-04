import React, { useEffect, useState } from "react";

import { ArgumentValue, IArgumentInput } from "../../interfaces";
import {
	isSolidityAddress,
	isSolidityAddressArray,
	isSolidityBool,
	isSolidityBoolArray,
	isSolidityBytes,
	isSolidityBytesArray,
	isSolidityInt,
	isSolidityIntArray,
	isSolidityString,
	isValidAddress,
	isValidAddressArray,
	isValidBool,
	isValidBoolArray,
	isValidBytes,
	isValidBytesArray,
	isValidInt,
	isValidIntArray,
} from "../../utils";

function ArgumentInput({
	argumentList,
	setArgumentList,
	argument,
	setHomeErrorMessage,
}: IArgumentInput) {
	const [argumentValue, setArgumentValue] = useState<string>("");

	const castValue = (argType: string, value: string): ArgumentValue => {
		if (isSolidityString(argType)) return value;
		if (isSolidityAddress(argType)) return value;
		if (isSolidityAddressArray(argType)) {
			const elements = value.slice(1, -1);
			return elements.split(",");
		}
		if (isSolidityBool(argType)) return value === "true";
		if (isSolidityBoolArray(argType))
			return value.split(",").map((v) => v === "true");
		if (isSolidityBytes(argType)) return value;
		if (isSolidityBytesArray(argType)) {
			const elements = value.slice(1, -1);
			return elements.split(",");
		}
		if (isSolidityInt(argType)) return BigInt(value);
		if (isSolidityIntArray(argType)) {
			const elements = value.slice(1, -1).split(/\s*,\s*/);
			return elements.map((element) => BigInt(element));
		}
		return value;
	};

	const isInputValid = (value: string): boolean => {
		let isValid = false;
		switch (true) {
			case isSolidityString(argument.type):
				isValid = true;
				break;
			case isSolidityAddress(argument.type):
				isValid = isValidAddress(value);
				break;
			case isSolidityAddressArray(argument.type):
				isValid = isValidAddressArray(value);
				break;
			case isSolidityBool(argument.type):
				isValid = isValidBool(value);
				break;
			case isSolidityBoolArray(argument.type):
				isValid = isValidBoolArray(value);
				break;
			case isSolidityBytes(argument.type):
				isValid = isValidBytes(value);
				break;
			case isSolidityBytesArray(argument.type):
				isValid = isValidBytesArray(value);
				break;
			case isSolidityInt(argument.type):
				isValid = isValidInt(value);
				break;
			case isSolidityIntArray(argument.type):
				isValid = isValidIntArray(value);
				break;
			default:
				isValid = false;
		}
		return isValid;
	};

	const validateInput = (value: string) => {
		const isValid = isInputValid(value);

		if (value.length === 0) {
			setHomeErrorMessage("");
		} else if (value.length > 0 && isValid) {
			setHomeErrorMessage("");

			const updatedValue = castValue(argument!.type, value);

			setArgumentList(
				argumentList!.map((arg) =>
					arg.id === argument.id
						? { ...arg, value: updatedValue }
						: arg
				)
			);
		} else {
			setHomeErrorMessage("Invalid input for the argument type.");
		}
	};

	const handlePlaceHolder = (): string => {
		const argType =
			argumentList!.find((arg) => arg.id === argument.id)?.type || "";

		switch (true) {
			case isSolidityString(argType):
				return "Ex: str0";
			case isSolidityAddress(argType):
				return "Ex: 0x1D...49";
			case isSolidityAddressArray(argType):
				return "Ex: [0x1D...49, 0x2B...21, 0x3D...31]";
			case isSolidityBool(argType):
				return "Ex: true";
			case isSolidityBoolArray(argType):
				return "Ex: [true, false, false]";
			case isSolidityBytes(argType):
				return "Ex: 0x1A3";
			case isSolidityBytesArray(argType):
				return "Ex: [0x1A3, 0xB4F, 0xC2E]";
			case isSolidityInt(argType):
				return "Ex: 112233";
			case isSolidityIntArray(argType):
				return "Ex: [0, 1, 2]";
			default:
				return "Ex: str0";
		}
	};

	const handleValueChange = (input: string) => {
		setArgumentValue(input);
		validateInput(input);
	};

	// If argument type changes, clear the input
	useEffect(() => {
		handleValueChange("");
	}, [argument.type]);

	return (
		<input
			className="h-10 w-full bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
			type="text"
			placeholder={handlePlaceHolder()}
			value={argumentValue}
			onChange={(event) => handleValueChange(event.target.value)}
			autoComplete="off"
		/>
	);
}

export default ArgumentInput;
