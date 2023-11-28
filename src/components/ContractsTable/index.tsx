import React, { useState } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { PiCheckSquareOffset, PiCopy } from "react-icons/pi";

import { IContractsTable } from "../../interfaces";
import { getChain } from "../../resources";
import { copyToClipboard } from "../../utils";

function ContractsTable({
	deployedContracts,
	currentNetwork,
}: IContractsTable) {
	const [copiedAddress, setCopiedAddress] = useState<string>("");
	const [copied, setCopied] = useState<boolean>(false);

	return (
		<div className="flex w-full flex-col overflow-x-auto ring-1 ring-dark-200">
			<table className="w-full text-left">
				<tbody>
					<tr className="border-b border-b-dark-200">
						<td className="px-6 py-4 font-bold">Address</td>
					</tr>
					{deployedContracts.map((contract) => (
						<tr
							className="border-b border-b-dark-200"
							key={contract}
						>
							<td className="flex items-center justify-start px-6 py-4">
								<span className="break-all">{contract}</span>
								<button
									className="text-light-400 outline-none hover:text-primary-100"
									onClick={(e) => {
										e.stopPropagation();
										setCopiedAddress(contract);
										copyToClipboard(contract, setCopied);
									}}
								>
									{copied && copiedAddress === contract ? (
										<PiCheckSquareOffset
											className="ml-3 text-good-accent"
											size="18px"
										/>
									) : (
										<PiCopy className="ml-3" size="18px" />
									)}
								</button>
								<a
									className="text-light-400 outline-none hover:text-primary-100"
									href={`${getChain({
										chainId: currentNetwork?.chainId,
									})?.blockExplorer}/address/${contract}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<LiaExternalLinkAltSolid
										className="ml-5"
										size="18px"
									/>
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ContractsTable;
