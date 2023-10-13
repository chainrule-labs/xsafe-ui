"use client";

import { Menu } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { AUTO_CONNECT, LAST_WALLET_CONNECTED } from "../../data/constants";
import { walletList } from "../../data/wallets";
import { WalletType } from "../../interfaces/state/wallet";
import WalletService from "../../services/wallet";

function ConnectButton() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const getCachedWalletInfo = async () => {
		if (localStorage.getItem(AUTO_CONNECT)) {
			const lastWalletType = localStorage.getItem(
				LAST_WALLET_CONNECTED
			) as WalletType;

			const cleanedLastWalletType = lastWalletType.replace(/"/g, "");

			const lastWallet = walletList.find(
				(wallet) => wallet.type === cleanedLastWalletType
			);

			if (lastWallet) {
				await WalletService.getInstance().connectWallet(
					setIsLoading,
					lastWallet
				);
			}
		}
	};

	useEffect(() => {
		getCachedWalletInfo();
	}, []);

	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button
				style={
					{
						"--offset-border-color": "#addad5",
					} as React.CSSProperties
				}
				className="offset-border z-10 flex h-10 w-28 items-center justify-center bg-[#fd6794df] font-bold text-black outline-none hover:bg-[#fd6793]"
			>
				{isLoading ? (
					<AiOutlineLoading3Quarters
						className="animate-spin"
						size="22px"
					/>
				) : (
					"Connect"
				)}
			</Menu.Button>
			<Menu.Items className="absolute right-0 mt-4 w-48 origin-top-right bg-black outline-none ring-1 ring-[#395754]">
				<div className="px-1 py-1 ">
					{walletList.map((wallet) => (
						<Menu.Item key={wallet.label}>
							{({ active }) => (
								<button
									className={`${
										active && "bg-[#152120] text-white"
									} group flex w-full items-center px-2 py-2 text-sm`}
									onClick={() =>
										WalletService.getInstance().connectWallet(
											setIsLoading,
											wallet
										)
									}
								>
									<div className="mr-5 flex h-7 w-7 items-center justify-center">
										<img
											className="w-8"
											alt="listedWalletImage"
											src={wallet.imageSource}
										/>
									</div>
									{wallet.label}
								</button>
							)}
						</Menu.Item>
					))}
				</div>
			</Menu.Items>
		</Menu>
	);
}

export default ConnectButton;
