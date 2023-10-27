"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BytecodeInput from "../components/BytecodeInput";
import ChainsTable from "../components/ChainsTable";
import ContractsTable from "../components/ContractsTable";
import DeployModal from "../components/DeployModal";
import { chainList } from "../data/chains";
import { SupportedChain } from "../interfaces";
import { getChain } from "../resources";
import DeployService from "../services/deploy";
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
	const [deployedContracts, setDeployedContracts] = useState<string[]>([""]);

	const closeModal = () => {
		setSelectedChain(null);
		setIsModalOpen(false);
	};

	const openModal = (chain: SupportedChain) => {
		setSelectedChain(chain);
		setIsModalOpen(true);
	};

	const getDeployedContracts = async () => {
		await DeployService.getInstance().getDeploymentHistory(
			setDeployedContracts
		);
	};

	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			getDeployedContracts();
		}
	}, [isWalletConnected, currentNetwork]);

	return (
		<div className="flex w-full flex-1 flex-col items-center justify-start py-10">
			<div className="flex min-h-fit w-full min-w-[300px] max-w-3xl flex-col px-4">
				<h1 className="mb-5 w-fit border-b border-b-primary-100 pb-1 text-xl font-bold">
					Predictive Deployment
				</h1>
				<span className="mb-2">
					Deploy any smart contract to multiple chains at the same
					address.
				</span>
				<span className="mb-5">Forget nonces and salts.</span>
				<span className="mb-1 text-start font-bold text-primary-100">
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
				<div className="mt-8 flex w-full flex-col">
					<span className="text-start font-bold text-primary-100">
						Chains
					</span>
					<span className="mt-2">
						<span className="text-primary-100">NOTE: </span>
						This is a beta version. The only chains currently
						supported are Base Goerli, Goerli, and Sepolia.
					</span>
					<ChainsTable
						chainList={chainList}
						isWalletConnected={isWalletConnected}
						currentNetwork={currentNetwork!}
						nativeBalance={nativeBalance!}
						bytecode={bytecode}
						openModal={openModal}
						homeErrorMessage={homeErrorMessage}
						setHomeErrorMessage={setHomeErrorMessage}
					/>
					<DeployModal
						isOpen={isModalOpen}
						closeModal={closeModal}
						chain={selectedChain!}
						bytecode={bytecode}
						setDeployedContracts={setDeployedContracts}
						nativeBalance={nativeBalance!}
					/>
				</div>
				{isWalletConnected &&
				currentNetwork?.isSupported &&
				deployedContracts.length > 0 ? (
					<>
						<span className="mb-1 mt-10 text-start font-bold text-primary-100">
							Deployed Contracts on{" "}
							{
								getChain({ chainId: currentNetwork?.chainId })
									?.name
							}
						</span>
						<ContractsTable
							deployedContracts={deployedContracts}
							currentNetwork={currentNetwork}
						/>
					</>
				) : null}
			</div>
		</div>
	);
}
