import React from "react";

import { IBytecodeInput } from "../../interfaces";
import { isHex } from "../../utils";

function BytecodeInput({
	bytecode,
	setBytecode,
	setHomeErrorMessage,
}: IBytecodeInput) {
	const handleInputChange = async (input: string) => {
		setBytecode(input);

		const isValid = isHex(input);

		if (input.length === 0) {
			setHomeErrorMessage("");
		} else if (input.length > 0 && isValid) {
			setHomeErrorMessage("");
		} else {
			setHomeErrorMessage("Invalid bytecode.");
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
