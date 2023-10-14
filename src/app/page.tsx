"use client";

import React, { useState } from "react";

import BytecodeInput from "../components/BytecodeInput";

export default function Home() {
	const [bytecode, setBytecode] = useState<string>("");

	return (
		<div className="flex w-full flex-1 flex-col items-center justify-start py-10">
			<div className="flex min-h-fit w-full min-w-[300px] max-w-3xl flex-col px-4">
				<span className="mb-1 text-start font-bold">
					Contract Bytecode
				</span>
				<BytecodeInput bytecode={bytecode} setBytecode={setBytecode} />
			</div>
		</div>
	);
}
