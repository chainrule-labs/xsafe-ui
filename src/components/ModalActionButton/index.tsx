import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";

import { IModalActionButton } from "../../interfaces/components/modalActionButton";
import { RootState } from "../../state/store";
import { isHex } from "../../utils/isHex";

function ModalActionButton({
	action,
	label,
	isLoading,
	bytecode,
	errorMessage,
}: IModalActionButton) {
	const { isWalletConnected, currentNetwork, nativeBalance } = useSelector(
		(state: RootState) => state.wallet
	);
	const [valid, setValid] = useState<boolean>(false);

	// Check validity of inputs to properly handle style and disability of button
	const checkValidity = async () => {
		let bytecodeIsValid = false;
		if (bytecode) {
			bytecodeIsValid = isHex(bytecode);
		}

		const basicConditions = [
			!errorMessage,
			!isLoading,
			isWalletConnected,
			currentNetwork?.isSupported,
			BigInt(nativeBalance!.value) > BigInt(0),
		];

		setValid(bytecodeIsValid && basicConditions.every(Boolean));
	};

	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			checkValidity();
		}
	}, [
		errorMessage,
		isLoading,
		isWalletConnected,
		currentNetwork,
		bytecode,
		nativeBalance,
	]);

	return (
		<button
			style={
				{
					"--offset-border-color": "#395754", // dark-200
				} as React.CSSProperties
			}
			className={`${
				!valid && "cursor-not-allowed"
			} offset-border z-10 flex h-10 w-20 shrink-0 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100`}
			onClick={() => action()}
			disabled={!valid}
		>
			{isLoading ? (
				<AiOutlineLoading3Quarters
					className="animate-spin"
					size="22px"
				/>
			) : (
				label
			)}
		</button>
	);
}

export default ModalActionButton;
