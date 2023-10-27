"use client";

import { Menu, Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { AUTO_CONNECT, LAST_WALLET_CONNECTED } from "../../data/constants";
import { walletList } from "../../data/wallets";
import { WalletType } from "../../interfaces";
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
			{({ open }) => (
				<>
					<Menu.Button
						style={
							{
								"--offset-border-color": "#addad5", // light-200
							} as React.CSSProperties
						}
						className="offset-border z-10 flex h-10 w-28 items-center justify-center bg-primary-200 font-bold text-dark-600 outline-none hover:bg-primary-100"
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
					<Transition show={open}>
						<Menu.Items className="absolute right-0 z-50 mt-4 w-48 origin-top-right bg-dark-600 text-sm outline-none ring-1 ring-dark-200">
							<div className="p-1">
								{walletList.map((wallet) => (
									<Menu.Item key={wallet.label}>
										{({ active }) => (
											<button
												className={`${
													active &&
													"bg-dark-400 text-primary-100"
												} group flex w-full items-center p-2`}
												onClick={() =>
													WalletService.getInstance().connectWallet(
														setIsLoading,
														wallet
													)
												}
											>
												<div className="mr-5 flex h-7 w-7 items-center justify-center">
													<img
														className="w-7"
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
					</Transition>
				</>
			)}
		</Menu>
	);
}

export default ConnectButton;
