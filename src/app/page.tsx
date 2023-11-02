"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ArgumentButton from "../components/ArgumentButton";
import ArgumentInput from "../components/ArgumentInput";
import ArgumentTypeDropDown from "../components/ArgumentTypeDropdown";
import BytecodeInput from "../components/BytecodeInput";
import ChainsTable from "../components/ChainsTable";
import ContractsTable from "../components/ContractsTable";
import DeployModal from "../components/DeployModal";
import { solidityTypeList } from "../data/arguments";
import { chainList } from "../data/chains";
import { Argument, SupportedChain } from "../interfaces";
import { getChain } from "../resources";
import DeployService from "../services/deploy";
import { RootState } from "../state/store";

export default function Home() {
	const { isWalletConnected, currentNetwork, nativeBalance } = useSelector(
		(state: RootState) => state.wallet
	);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [homeErrorMessage, setHomeErrorMessage] = useState<string>("");
	const [deployedContracts, setDeployedContracts] = useState<string[]>([""]);
	const [bytecode, setBytecode] = useState<string>("");
	const [argumentList, setArgumentList] = useState<Argument[] | null>(null);
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
				<span className="mb-1 font-bold text-primary-100">
					Contract Bytecode{" "}
				</span>
				<BytecodeInput
					bytecode={bytecode}
					setBytecode={setBytecode}
					setHomeErrorMessage={setHomeErrorMessage}
				/>
				<span className="mt-8 font-bold text-primary-100">
					Constructor Arguments{" "}
				</span>
				<div className="flex w-full flex-col">
					{argumentList && argumentList.length > 0
						? argumentList.map((arg) => (
								<div
									className="mt-2 flex w-full flex-col smd:flex-row"
									key={arg.id}
								>
									<ArgumentTypeDropDown
										solidityTypes={solidityTypeList}
										argumentList={argumentList}
										setArgumentList={setArgumentList}
										argumentId={arg.id}
									/>
									<div className="mb-4 ml-0 mt-2 flex smd:mb-0 smd:ml-2 smd:mt-0 smd:w-80 smd:max-w-full smd:grow">
										<ArgumentInput
											argumentList={argumentList}
											setArgumentList={setArgumentList}
											argumentId={arg.id}
										/>
										<div className="mr-2" />
										<ArgumentButton
											argumentList={argumentList}
											setArgumentList={setArgumentList}
											argumentId={arg.id}
										/>
									</div>
								</div>
						  ))
						: null}
					{argumentList ? (
						<div className="smd:mt-4" />
					) : (
						<div className="mt-1" />
					)}
					<ArgumentButton
						add
						argumentList={argumentList}
						setArgumentList={setArgumentList}
					/>
				</div>
				{homeErrorMessage && (
					<div className="mt-2 flex w-full items-center justify-center text-sm">
						<span className="break-all text-bad-accent">
							{homeErrorMessage}
						</span>
					</div>
				)}
				<div className="mt-8 flex w-full flex-col">
					<span className="font-bold text-primary-100">Chains</span>
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
						argumentList={argumentList}
						openModal={openModal}
						homeErrorMessage={homeErrorMessage}
						setHomeErrorMessage={setHomeErrorMessage}
					/>
					<DeployModal
						isOpen={isModalOpen}
						closeModal={closeModal}
						chain={selectedChain!}
						bytecode={bytecode}
						argumentList={argumentList}
						setDeployedContracts={setDeployedContracts}
						nativeBalance={nativeBalance!}
					/>
				</div>
				{isWalletConnected &&
				currentNetwork?.isSupported &&
				deployedContracts.length > 0 ? (
					<>
						<span className="mb-1 mt-10 font-bold text-primary-100">
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
