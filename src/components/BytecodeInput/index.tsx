import React from "react";
import { useSelector } from "react-redux";

import { IBytecodeInput } from "../../interfaces";
import { RootState } from "../../state/store";
import { isHex } from "../../utils";

function BytecodeInput({
	bytecode,
	setBytecode,
	setHomeErrorMessage,
}: IBytecodeInput) {
	const { isWalletConnected } = useSelector(
		(state: RootState) => state.wallet
	);

	const handleInputChange = async (input: string) => {
		setBytecode(input);

		if (isWalletConnected) {
			const isBytecodeValid = isHex(input);

			if (input.length > 0 && !isBytecodeValid) {
				setHomeErrorMessage("Invalid bytecode.");
			} else {
				setHomeErrorMessage("");
			}
		}
	};

	return (
		<textarea
			className="min-h-[128px] w-full bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
			placeholder="0x..."
			value={bytecode}
			onChange={(event) => handleInputChange(event.target.value)}
			autoComplete="off"
		/>
	);
}

export default BytecodeInput;
