import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { IDeployModal } from "../../interfaces/components/deployModal";

function DeployModal({ isOpen, closeModal, chain }: IDeployModal) {
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
									<span>Deployment</span>
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
								<div className="mt-4 flex flex-col items-center justify-center">
									<div className="my-2" />
									<span className="text-xs text-light-400">
										Deploy to {chain && chain.name}
									</span>
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
