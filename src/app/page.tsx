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
	const { isWalletConnected, currentNetwork } = useSelector(
		(state: RootState) => state.wallet
	);
	const [bytecode, setBytecode] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [selectedChain, setSelectedChain] = useState<SupportedChain | null>(
		null
	);

	const closeModal = () => {
		setSelectedChain(null);
		setIsModalOpen(false);
	};

	const openModal = (chain: SupportedChain) => {
		setSelectedChain(chain);
		setIsModalOpen(true);
	};

	/**
	 * What is needed to get Create2Factory to deploy a contract on a chain?
	 * 1. Call userNonces to get nonce
	 * 2. Call getTransactionHash
	 * 3. Get the user to sign the returned transaction hash
	 * 4. Call getAddress and show the user the address
	 * 5. Call deploy
	 */

	/**
	 * What is needed to know which contracts have already been deployed?
	 * 1. For every chain, query for events using the user's address (block explorer API or maybe viem)
	 * 2. Show user list of contracts for each chain in a table.
	 */

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
				<BytecodeInput bytecode={bytecode} setBytecode={setBytecode} />
				{/* TODO: Need to somehow know if contract has been deployed to chain.
						  If deployed, need to render a checkmark and button to view on explorer.
						  Else, render DeployButton.
				*/}
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
								openModal={openModal}
							/>
						</div>
					))}
					<DeployModal
						isOpen={isModalOpen}
						closeModal={closeModal}
						chain={selectedChain!}
					/>
				</div>
			</div>
		</div>
	);
}
