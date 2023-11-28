import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";

import { IChainsTable } from "../../interfaces";
import DeployButton from "../DeployButton";

function ChainsTable({
	chainList,
	isWalletConnected,
	currentNetwork,
	nativeBalance,
	bytecode,
	argumentList,
	openModal,
	homeErrorMessage,
	setHomeErrorMessage,
}: IChainsTable) {
	return (
		<div className="flex w-full flex-col overflow-x-auto ring-1 ring-dark-200">
			<table className="w-full text-left">
				<tbody>
					{chainList.map((chain) => (
						<tr
							className="border-b border-b-dark-200"
							key={chain.chainId}
						>
							<td className="px-6 py-4">
								<div className="flex items-center">
									<div className="mr-3 flex h-7 w-7 shrink-0 items-center justify-center">
										<img
											className="w-7"
											alt="listedChainImage"
											src={chain.imageSource}
										/>
									</div>
									<span className="mr-3">{chain.name}</span>
									{isWalletConnected &&
									currentNetwork?.chainId ===
										chain.chainId ? (
										<FaRegCircleDot
											className="mr-3 shrink-0 text-good-accent"
											size="14px"
										/>
									) : null}
								</div>
							</td>
							<td className="flex justify-end px-6 py-4">
								<DeployButton
									chain={chain}
									isWalletConnected={isWalletConnected}
									currentNetwork={currentNetwork!}
									nativeBalance={nativeBalance!}
									bytecode={bytecode}
									argumentList={argumentList}
									openModal={openModal}
									homeErrorMessage={homeErrorMessage}
									setHomeErrorMessage={setHomeErrorMessage}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ChainsTable;
