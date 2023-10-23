import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { IDeployModal } from "../../interfaces/components/deployModal";

function DeployModal({ isOpen, closeModal, chain }: IDeployModal) {
	const [signed, setSigned] = useState<boolean>(false);

	const getAddress = async () => {
		// call DeployService.getInstance().getAddress()
	};

	const handleSignature = async () => {
		// call DeployService.getInstance().sign()
		setSigned(true);
	};

	const handleDeployment = async () => {
		// call DeployService.getInstance().deploy()
		setSigned(false);
	};

	useEffect(() => {
		getAddress();
	}, []);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={() => closeModal()}
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
							<Dialog.Panel className="min-w-[300px] transform overflow-hidden border border-dark-200 bg-dark-600 px-6 pb-6 pt-2 text-left align-middle sm:w-[430px]">
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
										onClick={() => closeModal()}
									>
										<AiOutlineClose size="20px" />
									</button>
								</Dialog.Title>
								<div className="mt-5 flex flex-col items-start justify-center">
									<span className="mb-1 underline underline-offset-4">
										Expected Address
									</span>
									<span className="text-light-400">
										0xdeadbeef
									</span>
									{!signed && (
										<>
											<span className="mb-1 mt-2 underline underline-offset-4">
												Disclosure
											</span>
											<span className="text-light-400">
												For security reasons, your
												signature is required to confirm
												your intent to deploy your smart
												contract at the expected address
												on {chain && chain.name}
											</span>
										</>
									)}
									<div className="mt-5 self-center">
										{signed ? (
											<button
												style={
													{
														"--offset-border-color":
															"#395754", // dark-200
													} as React.CSSProperties
												}
												className="offset-border z-10 flex h-10 w-20 shrink-0 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
												onClick={handleDeployment}
											>
												Deploy
											</button>
										) : (
											<button
												style={
													{
														"--offset-border-color":
															"#395754", // dark-200
													} as React.CSSProperties
												}
												className="offset-border z-10 flex h-10 w-20 shrink-0 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
												onClick={handleSignature}
											>
												Sign
											</button>
										)}
									</div>
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
