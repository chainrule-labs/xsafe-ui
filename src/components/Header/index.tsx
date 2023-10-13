"use client";

import React from "react";
import { useSelector } from "react-redux";

import WalletService from "../../services/wallet";
import { RootState } from "../../state/store";
import ConnectButton from "../ConnectButton";

function Header() {
	const { isWalletConnected } = useSelector(
		(state: RootState) => state.wallet
	);

	return (
		<header className="flex w-full items-center justify-between border-b border-b-[#395754] px-4 py-2">
			<div className="relative flex w-14 justify-center outline-none">
				<img src="/images/iconXsafe.svg" alt="xsafe-icon" />
			</div>
			{isWalletConnected ? (
				// TODO: Replace with WalletMenu and NetworkDropdown
				<button
					style={
						{
							"--offset-border-color": "#addad5",
						} as React.CSSProperties
					}
					className="offset-border z-10 h-10 w-28 items-center justify-center bg-[#fd6794df] font-bold text-black outline-none hover:bg-[#fd6793]"
					onClick={() =>
						WalletService.getInstance().disconnectWallet()
					}
				>
					Disconnect
				</button>
			) : (
				<ConnectButton />
			)}
		</header>
	);
}

export default Header;
