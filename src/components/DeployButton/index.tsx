import React from "react";

import { IDeployButton } from "../../interfaces/components/deployButton";
import WalletService from "../../services/wallet";

function DeployButton({
	chain,
	isWalletConnected,
	currentNetwork,
	openModal,
}: IDeployButton) {
	const handleDeploy = async () => {
		if (
			isWalletConnected &&
			currentNetwork.isSupported &&
			currentNetwork.chainId === chain.chainId
		) {
			openModal(chain);
		} else if (
			isWalletConnected &&
			currentNetwork.isSupported &&
			currentNetwork.chainId !== chain.chainId
		) {
			WalletService.getInstance().switchNetwork({
				chainId: chain.chainId,
				isSupported: true,
			});
		} else {
			// eslint-disable-next-line no-console
			console.log(chain.name);
		}
	};

	return (
		<button
			style={
				{
					"--offset-border-color": "#395754", // dark-200
				} as React.CSSProperties
			}
			className="offset-border z-10 flex h-10 w-20 shrink-0 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
			onClick={handleDeploy}
		>
			Deploy
		</button>
	);
}

export default DeployButton;
