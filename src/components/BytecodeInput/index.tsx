import React from "react";

import { IBytecodeInput } from "../../interfaces/components/bytecodeInput";

function BytecodeInput({ bytecode, setBytecode }: IBytecodeInput) {
	return (
		<textarea
			className="min-h-[128px] w-full bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100"
			placeholder="0x..."
			value={bytecode}
			onChange={(event) => setBytecode(event.target.value)}
			autoComplete="off"
		/>
	);
}

export default BytecodeInput;
