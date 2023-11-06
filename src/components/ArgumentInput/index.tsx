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
		if (isSolidityAddress(argType)) return value.trim();
		if (isSolidityAddressArray(argType)) {
			const elements = value
				.slice(1, -1)
				.split(",")
				.map((el) => el.trim());
			return elements;
		}
		if (isSolidityBool(argType)) return value.trim() === "true";
		if (isSolidityBoolArray(argType)) {
			const elements = value
				.slice(1, -1)
				.split(",")
				.map((el) => el.trim() === "true");
			return elements;
		}
		if (isSolidityBytes(argType)) return value.trim();
		if (isSolidityBytesArray(argType)) {
			const elements = value
				.slice(1, -1)
				.split(",")
				.map((el) => el.trim());
			return elements;
		}
		if (isSolidityInt(argType)) return BigInt(value.trim());
		if (isSolidityIntArray(argType)) {
			const elements = value
				.slice(1, -1)
				.split(",")
				.map((el) => BigInt(el.trim()));
			return elements;
		}
		return value;
	};

	const isInputValid = (value: string): boolean => {
		let isValid = false;

		if (value.length > 0) {
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
		}
		return isValid;
	};

	const updateValue = (value: string) => {
		const isValid = isInputValid(value);

		if (value.length === 0) {
			setHomeErrorMessage("");
		} else if (value.length > 0 && isValid) {
			setHomeErrorMessage("");

			const updatedValue = castValue(argument!.type, value);

			setArgumentList(
				argumentList!.map((arg) =>
					arg.id === argument.id
						? { ...arg, value: updatedValue, isValid: true }
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
				return "Ex: [0x1D...49,0x2B...21,0x3D...31]";
			case isSolidityBool(argType):
				return "Ex: true";
			case isSolidityBoolArray(argType):
				return "Ex: [true,false,false]";
			case isSolidityBytes(argType):
				return "Ex: 0x1A3";
			case isSolidityBytesArray(argType):
				return "Ex: [0x1A3,0xB4F,0xC2E]";
			case isSolidityInt(argType):
				return "Ex: 112233";
			case isSolidityIntArray(argType):
				return "Ex: [0,1,2]";
			default:
				return "Ex: str0";
		}
	};

	const handleValueChange = (input: string) => {
		setArgumentValue(input);
		updateValue(input);
	};

	// If argument type changes, clear the input.
	// For reference, argument.value and argument.isValid are being
	// reset in ArgumentTypeDropdown when argument.type changes
	useEffect(() => {
		setArgumentValue("");
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
