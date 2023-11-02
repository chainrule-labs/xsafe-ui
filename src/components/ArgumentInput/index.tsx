import React, { useState } from "react";

// import { useSelector } from "react-redux";
import { IArgumentInput } from "../../interfaces";
// import { RootState } from "../../state/store";
// import { isHex } from "../../utils";

function ArgumentInput({
	argumentList,
	setArgumentList,
	argumentId,
}: IArgumentInput) {
	// const { isWalletConnected } = useSelector(
	// 	(state: RootState) => state.wallet
	// );
	const [argumentValue, setArgumentValue] = useState<string>("");

	// const handleInputChange = async (input: string) => {
	// 	setArgumentValue(input);

	// if (isWalletConnected) {
	// 	const isBytecodeValid = isHex(input);

	// 	if (input.length > 0 && !isBytecodeValid) {
	// 		setHomeErrorMessage("Invalid argument.");
	// 	} else {
	// 		setHomeErrorMessage("");
	// 	}
	// }
	// };

	const handleValueChange = (newValue: string) => {
		setArgumentValue(newValue);
		if (!argumentList || !argumentId) return;

		const updatedList = argumentList.map((arg) => {
			if (arg.id === argumentId) {
				return { ...arg, value: newValue };
			}
			return arg;
		});

		setArgumentList(updatedList);
	};

	const handlePlaceHolder = (): string => {
		if (argumentList && argumentId) {
			const argType =
				argumentList.find((arg) => arg.id === argumentId)?.type || "";

			const isArray = argType.includes("[]");
			const baseType = argType.replace("[]", "");

			const placeholders: { [key: string]: string } = {
				address: "Ex: 0x11...11",
				bool: "Ex: true",
				bytes: "Ex: 0x112233",
				int: "Ex: 112233",
				uint: "Ex: 112233",
				string: "Ex: str0",
			};

			if (placeholders[baseType]) {
				const placeholder = placeholders[baseType];
				return isArray
					? `Ex: [${placeholder}, ${placeholder}, ...]`
					: placeholder;
			}
		}

		return "Ex: 0x12...21";
	};

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
