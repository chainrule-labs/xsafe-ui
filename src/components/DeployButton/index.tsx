import React, { useEffect, useState } from "react";

import { DISABLED_CHAINS } from "../../data/constants";
import { IDeployButton } from "../../interfaces/components/deployButton";
import WalletService from "../../services/wallet";
import { isHex } from "../../utils/isHex";

function DeployButton({
	chain,
	isWalletConnected,
	currentNetwork,
	nativeBalance,
	openModal,
	bytecode,
	homeErrorMessage,
	setHomeErrorMessage,
}: IDeployButton) {
	const [valid, setValid] = useState<boolean>(false);

	const handleDeployModal = async () => {
		if (
			isWalletConnected &&
			currentNetwork.isSupported &&
			currentNetwork.chainId === chain?.chainId
		) {
			openModal(chain);
		}

		if (
			isWalletConnected &&
			currentNetwork.isSupported &&
			currentNetwork.chainId !== chain?.chainId
		) {
			WalletService.getInstance().switchNetwork({
				chainId: chain?.chainId,
				isSupported: true,
			});
		}
	};

	// Check validity of inputs to properly handle style and disability of button
	const checkValidity = async () => {
		let bytecodeIsValid = false;
		if (bytecode) {
			bytecodeIsValid = isHex(bytecode);
		}

		const basicConditions = [
			!homeErrorMessage,
			isWalletConnected,
			currentNetwork?.isSupported,
			BigInt(nativeBalance.value) > BigInt(0),
		];

		setValid(bytecodeIsValid && basicConditions.every(Boolean));
	};

	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			checkValidity();
		}
	}, [
		homeErrorMessage,
		isWalletConnected,
		currentNetwork,
		bytecode,
		nativeBalance,
	]);

	useEffect(() => {
		if (
			isWalletConnected &&
			currentNetwork!.isSupported &&
			currentNetwork!.chainId === chain?.chainId
		) {
			if (BigInt(nativeBalance!.value) === BigInt(0)) {
				setHomeErrorMessage(
					`Insufficient ${chain.nativeCurrency.symbol} for gas.`
				);
			}
		}
	}, [nativeBalance]);

	return (
		<button
			style={
				{
					"--offset-border-color": "#395754", // dark-200
				} as React.CSSProperties
			}
			className={`${
				!valid || DISABLED_CHAINS.includes(chain.chainId)
					? "cursor-not-allowed"
					: null
			} offset-border flex h-10 w-20 shrink-0 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100`}
			onClick={handleDeployModal}
			disabled={!valid || DISABLED_CHAINS.includes(chain.chainId)}
		>
			Deploy
		</button>
	);
}

export default DeployButton;
