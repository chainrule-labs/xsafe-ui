"use client";

import React, { useState } from "react";
import { FaRegCircleDot } from "react-icons/fa6";
import { useSelector } from "react-redux";

import BytecodeInput from "../components/BytecodeInput";
import DeployButton from "../components/DeployButton";
import DeployModal from "../components/DeployModal";
import { chainList } from "../data/chains";
import { SupportedChain } from "../interfaces/data/chains";
import { RootState } from "../state/store";

export default function Home() {
	const { isWalletConnected, currentNetwork, nativeBalance } = useSelector(
		(state: RootState) => state.wallet
	);
	const [bytecode, setBytecode] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedChain, setSelectedChain] = useState<SupportedChain | null>(
		null
	);
	const [homeErrorMessage, setHomeErrorMessage] = useState<string>("");

	const closeModal = () => {
		setSelectedChain(null);
		setIsModalOpen(false);
	};

	const openModal = (chain: SupportedChain) => {
		setSelectedChain(chain);
		setIsModalOpen(true);
	};

	return (
		<div className="flex w-full flex-1 flex-col items-center justify-start py-10">
			<div className="flex min-h-fit w-full min-w-[300px] max-w-3xl flex-col px-4">
				<h1 className="mb-5 w-fit border-b border-b-primary-100 pb-1 text-xl font-bold">
					Predictive Deployment
				</h1>
				<span className="mb-5">
					Deploy any smart contract to multiple EVM-compatible chains
					at the same address.
				</span>
				<span className="mb-1 text-start font-bold">
					Contract Bytecode
				</span>
				<BytecodeInput
					bytecode={bytecode}
					setBytecode={setBytecode}
					setHomeErrorMessage={setHomeErrorMessage}
				/>
				{homeErrorMessage && (
					<div className="mt-2 flex w-full items-center justify-center text-sm">
						<span className="break-all text-bad-accent">
							{homeErrorMessage}
						</span>
					</div>
				)}
				<div className="mt-2 flex w-full max-w-sm flex-col">
					{chainList.map((chain) => (
						<div
							className="mt-3 flex w-full items-center justify-between"
							key={chain.name}
						>
							<div className="flex items-center">
								<span className="mr-3">{chain.name}</span>
								{isWalletConnected &&
								currentNetwork?.chainId === chain.chainId ? (
									<FaRegCircleDot
										className="mr-3 text-good-accent"
										size="14px"
									/>
								) : null}
							</div>
							<DeployButton
								chain={chain}
								isWalletConnected={isWalletConnected}
								currentNetwork={currentNetwork!}
								nativeBalance={nativeBalance!}
								bytecode={bytecode}
								openModal={openModal}
								homeErrorMessage={homeErrorMessage}
								setHomeErrorMessage={setHomeErrorMessage}
							/>
						</div>
					))}
					<DeployModal
						isOpen={isModalOpen}
						closeModal={closeModal}
						chain={selectedChain!}
						bytecode={bytecode}
						nativeBalance={nativeBalance!}
					/>
				</div>
			</div>
		</div>
	);
}
