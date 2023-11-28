"use client";

import React, { useEffect, useState } from "react";
import { PiCheckSquareOffset, PiCopy } from "react-icons/pi";
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
import {
	copyToClipboard,
	encodeAbiParameters,
	parseAbiParameters,
} from "../utils";

export default function Home() {
	const { isWalletConnected, currentNetwork, nativeBalance } = useSelector(
		(state: RootState) => state.wallet
	);
	const [copied, setCopied] = useState<boolean>(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [homeErrorMessage, setHomeErrorMessage] = useState<string>("");
	const [deployedContracts, setDeployedContracts] = useState<string[]>([""]);
	const [bytecode, setBytecode] = useState<string>("");
	const [argumentList, setArgumentList] = useState<Argument[] | null>(null);
	const [selectedChain, setSelectedChain] = useState<SupportedChain | null>(
		null
	);
	const [constructorArgsBytecode, setConstructorArgsBytecode] =
		useState<string>("");

	const testnetList = chainList.filter((chain) => chain.isTestnet);
	const mainnetList = chainList.filter((chain) => !chain.isTestnet);

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

	const encodeConstructorArgs = (): string => {
		if (argumentList) {
			if (
				argumentList.every(
					(arg) =>
						arg.type !== "" &&
						arg.value !== "" &&
						arg.isValid === true
				)
			) {
				const types = argumentList.map((arg) => arg.type).join(",");
				const values = argumentList.map((arg) => arg.value);
				const formattedTypes = parseAbiParameters(types);

				return encodeAbiParameters(formattedTypes, values);
			}
			return "0x";
		}
		return "0x";
	};

	useEffect(() => {
		if (isWalletConnected && currentNetwork?.isSupported) {
			getDeployedContracts();
		}
	}, [isWalletConnected, currentNetwork]);

	useEffect(() => {
		const encodedArgs = encodeConstructorArgs();
		setConstructorArgsBytecode(encodedArgs);
	}, [argumentList]);

	return (
		<div className="flex w-full flex-1 flex-col items-center justify-start py-10">
			<div className="flex min-h-fit w-full max-w-3xl flex-col px-4">
				<h1 className="mb-5 w-fit border-b border-b-primary-100 pb-1 text-2xl font-bold">
					xSafe
				</h1>
				<span>
					Deploy to the same address on all chains. Forget nonces and
					salts.
				</span>
				<span className="mt-8 text-lg font-bold text-primary-100">
					Creation Code
				</span>
				<span className="mb-2">
					Enter bytecode without constructor arguments.
				</span>
				<BytecodeInput
					bytecode={bytecode}
					setBytecode={setBytecode}
					setHomeErrorMessage={setHomeErrorMessage}
				/>
				<span className="mt-8 text-lg font-bold text-primary-100">
					Constructor Arguments
				</span>
				<span>Add arguments if there are any.</span>
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
											argument={arg}
											setHomeErrorMessage={
												setHomeErrorMessage
											}
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
						<div className="mt-2" />
					)}
					<ArgumentButton
						add
						argumentList={argumentList}
						setArgumentList={setArgumentList}
					/>
					{argumentList && constructorArgsBytecode ? (
						<div className="mt-5 flex w-full flex-col">
							<span className="mb-1">Encoded Arguments</span>
							<div className="w-full break-all bg-dark-500 p-2 outline-none ring-1 ring-dark-200 focus:ring-dark-100">
								<button
									className="break-all text-left outline-none hover:text-primary-100"
									onClick={() =>
										copyToClipboard(
											constructorArgsBytecode,
											setCopied
										)
									}
								>
									<span className="max-w-full">
										{constructorArgsBytecode}
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
							</div>
						</div>
					) : null}
				</div>
				{homeErrorMessage && (
					<div className="mt-2 flex w-full items-center justify-center text-sm">
						<span className="break-all text-bad-accent">
							{homeErrorMessage}
						</span>
					</div>
				)}
				<div className="mt-8 flex w-full flex-col">
					<span className="mb-1 text-start text-lg font-bold text-primary-100">
						Mainnets
					</span>
					<ChainsTable
						chainList={mainnetList}
						isWalletConnected={isWalletConnected}
						currentNetwork={currentNetwork!}
						nativeBalance={nativeBalance!}
						bytecode={bytecode}
						argumentList={argumentList}
						openModal={openModal}
						homeErrorMessage={homeErrorMessage}
						setHomeErrorMessage={setHomeErrorMessage}
					/>
					<span className="mb-1 mt-8 text-start text-lg font-bold text-primary-100">
						Testnets
					</span>
					<ChainsTable
						chainList={testnetList}
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
						setDeployedContracts={setDeployedContracts}
						nativeBalance={nativeBalance!}
						constructorArgsBytecode={constructorArgsBytecode}
					/>
				</div>
				{isWalletConnected &&
				currentNetwork?.isSupported &&
				deployedContracts.length > 0 ? (
					<>
						<span className="mb-1 mt-10 text-lg font-bold text-primary-100">
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
