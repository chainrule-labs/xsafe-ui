"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { chainList } from "../../data/chains";
import { getChain } from "../../resources";
import WalletService from "../../services/wallet";
import { RootState } from "../../state/store";
import ConnectButton from "../ConnectButton";
import NetworkDropdown from "../NetworkDropdown";

function Header() {
	const { isWalletConnected, currentNetwork } = useSelector(
		(state: RootState) => state.wallet
	);
	const [selectedChain, setSelectedChain] = useState(
		isWalletConnected && currentNetwork!.isSupported
			? getChain({ chainId: currentNetwork!.chainId })
			: getChain({ name: "Ethereum" })
	);

	// If currentNetwork changes, update selectedChain to match currentNetwork
	useEffect(() => {
		if (isWalletConnected && currentNetwork!.isSupported) {
			setSelectedChain(getChain({ chainId: currentNetwork!.chainId }));
		}
	}, [currentNetwork]);

	// If selectedChain changes, switch network and update currentNetwork
	useEffect(() => {
		if (isWalletConnected) {
			if (selectedChain!.chainId !== currentNetwork!.chainId) {
				WalletService.getInstance().switchNetwork({
					chainId: selectedChain!.chainId,
					isSupported: true,
				});
			}
		}
	}, [selectedChain]);

	return (
		<header className="border-b-dark-200 flex w-full items-center justify-between border-b px-4 py-2">
			<div className="relative flex w-14 justify-center outline-none">
				<img src="/images/iconXsafe.svg" alt="xsafe-icon" />
			</div>
			{isWalletConnected ? (
				// TODO: Replace with WalletMenu and NetworkDropdown
				<div className="flex items-center justify-center">
					<NetworkDropdown
						chainList={chainList}
						selectedChain={selectedChain!}
						setSelectedChain={setSelectedChain}
						currentNetwork={currentNetwork!}
					/>
					<button
						style={
							{
								"--offset-border-color": "#395754", // dark-200
							} as React.CSSProperties
						}
						className="offset-border bg-dark-500 hover:bg-dark-400 hover:text-primary-100 z-10 h-10 w-28 items-center justify-center font-bold outline-none"
						onClick={() =>
							WalletService.getInstance().disconnectWallet()
						}
					>
						Disconnect
					</button>
				</div>
			) : (
				<ConnectButton />
			)}
		</header>
	);
}

export default Header;
