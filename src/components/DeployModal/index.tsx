import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { PiCheckSquareOffset, PiCopy } from "react-icons/pi";
import { useSelector } from "react-redux";

import { IDeployModal } from "../../interfaces/components/deployModal";
import DeployService from "../../services/deploy";
import WalletService from "../../services/wallet";
import { RootState } from "../../state/store";
import { copyToClipboard } from "../../utils/copyToClipboard";
import ModalActionButton from "../ModalActionButton";

function DeployModal({
	isOpen,
	closeModal,
	chain,
	bytecode,
	nativeBalance,
}: IDeployModal) {
	const { isWalletConnected, currentNetwork, address } = useSelector(
		(state: RootState) => state.wallet
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [signature, setSignature] = useState<string>("");
	const [successfulSignature, setSuccessfulSignature] =
		useState<boolean>(false);
	const [successfulDeployment, setSuccessfulDeployment] =
		useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [expectedAddress, setExpectedAddress] = useState<`0x${string}`>("0x");
	const [txHash, setTxHash] = useState<`0x${string}`>("0x");
	const [copied, setCopied] = useState<boolean>(false);

	const resetState = () => {
		setSignature("");
		setSuccessfulSignature(false);
		setSuccessfulDeployment(false);
		setErrorMessage("");
		setSuccessMessage("");
		setExpectedAddress("0x");
		setTxHash("0x");
	};

	const getAddress = async () => {
		DeployService.getInstance().getAddress(bytecode, setExpectedAddress);
	};

	const handleSignature = async () => {
		DeployService.getInstance().sign(
			setIsLoading,
			setSignature,
			setSuccessfulSignature,
			setErrorMessage
		);
	};

	const handleDeployment = async () => {
		DeployService.getInstance().deploy(
			setIsLoading,
			signature,
			bytecode,
			setTxHash,
			setSuccessfulDeployment,
			setSuccessfulSignature,
			setErrorMessage
		);
	};

	// After a successful signature
	useEffect(() => {
		if (
			isWalletConnected &&
			currentNetwork!.isSupported &&
			currentNetwork!.chainId === chain?.chainId
		) {
			if (successfulSignature) {
				setSuccessMessage("Intent to deploy confirmed.");
			}
		}
	}, [successfulSignature]);

	// After a successful deployment
	useEffect(() => {
		if (
			isWalletConnected &&
			currentNetwork!.isSupported &&
			currentNetwork!.chainId === chain?.chainId
		) {
			if (successfulDeployment) {
				setSuccessMessage("Contract successfully deployed!");
				WalletService.getInstance().getNativeBalance(address!);
			}
		}
	}, [successfulDeployment]);

	useEffect(() => {
		if (
			isWalletConnected &&
			currentNetwork!.isSupported &&
			currentNetwork!.chainId === chain?.chainId
		) {
			if (BigInt(nativeBalance!.value) === BigInt(0)) {
				setErrorMessage(
					`Insufficient ${chain.nativeCurrency.symbol} for gas.`
				);
			}
		}
	}, [nativeBalance]);

	useEffect(() => {
		if (
			isWalletConnected &&
			currentNetwork!.isSupported &&
			currentNetwork!.chainId === chain?.chainId
		) {
			getAddress();
		}
	}, [bytecode, chain]);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => {
					resetState();
					closeModal();
				}}
			>
				<Transition.Child
					as={Fragment}
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					{/* Dim app while modal is open */}
					<div className="fixed inset-0 bg-dark-500 bg-opacity-[85%]" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Panel className="min-w-[300px] transform overflow-hidden border border-dark-200 bg-dark-600 px-6 pb-6 pt-2 text-left align-middle sm:w-[485px]">
								<Dialog.Title
									as="h3"
									className="flex items-center justify-between"
								>
									<span className="mr-3 font-bold">
										{chain && chain.name} Deployment
									</span>
									<button
										style={
											{
												"--offset-border-color":
													"#395754", // dark-200
											} as React.CSSProperties
										}
										className="offset-border bg-dark-500 p-1 outline-none hover:bg-dark-400 hover:text-primary-100"
										onClick={() => {
											resetState();
											closeModal();
										}}
									>
										<AiOutlineClose size="20px" />
									</button>
								</Dialog.Title>
								<div className="mt-5 flex flex-col items-start justify-center">
									<span className="mb-1 underline underline-offset-4">
										Expected Address
									</span>
									<button
										className="break-all text-left text-light-400 outline-none hover:text-primary-100"
										onClick={() =>
											copyToClipboard(
												expectedAddress,
												setCopied
											)
										}
									>
										<span className="max-w-full">
											{expectedAddress}
										</span>
										{!copied ? (
											<PiCopy
												className="ml-2 inline"
												size="18px"
											/>
										) : (
											<PiCheckSquareOffset
												className="ml-2 inline text-good-accent"
												size="18px"
											/>
										)}
									</button>
									{successfulSignature ? (
										<div className="mt-5 self-center">
											<ModalActionButton
												action={handleDeployment}
												label="Deploy"
												isLoading={isLoading}
												bytecode={bytecode}
												errorMessage={errorMessage}
											/>
										</div>
									) : successfulDeployment ? (
										<div className="mt-3 flex flex-col">
											<span className="mb-1 underline underline-offset-4">
												TX Hash
											</span>
											<a
												href={`${chain?.blockExplorer}/tx/${txHash}`}
												target="_blank"
												rel="noopener noreferrer"
												className="break-all text-left text-light-400 outline-none hover:text-primary-100"
											>
												<span className="max-w-full">
													{txHash}
												</span>
												<LiaExternalLinkAltSolid
													className="ml-2 inline"
													size="18px"
												/>
											</a>
											<button
												style={
													{
														"--offset-border-color":
															"#395754", // dark-200
													} as React.CSSProperties
												}
												className="offset-border z-10 mt-5 flex h-10 w-20 shrink-0 items-center justify-center self-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
												onClick={() => {
													resetState();
													closeModal();
												}}
											>
												Close
											</button>
										</div>
									) : (
										<>
											<span className="mb-1 mt-2 underline underline-offset-4">
												Disclosure
											</span>
											<span className="text-light-400">
												For security reasons, your
												signature is required to confirm
												your intent to deploy your smart
												contract at the expected address
												on {chain && chain.name}.
											</span>
											<div className="mt-5 self-center">
												<ModalActionButton
													action={handleSignature}
													label="Sign"
													isLoading={isLoading}
													bytecode={bytecode}
													errorMessage={errorMessage}
												/>
											</div>
										</>
									)}
									{errorMessage && (
										<div className="mt-5 flex w-full items-center justify-center text-sm">
											<span className="break-all text-bad-accent">
												{errorMessage}
											</span>
										</div>
									)}
									{successMessage && (
										<div className="mt-5 flex w-full items-center justify-center text-sm">
											<span className="break-all text-good-accent">
												{successMessage}
											</span>
										</div>
									)}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

export default DeployModal;
