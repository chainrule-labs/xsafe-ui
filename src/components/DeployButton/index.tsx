import React from "react";

import { IDeployButton } from "../../interfaces/components/deployButton";

function DeployButton({ chain }: IDeployButton) {
	return (
		<button
			style={
				{
					"--offset-border-color": "#395754", // dark-200
				} as React.CSSProperties
			}
			className="offset-border z-10 flex h-10 w-20 shrink-0 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
			onClick={() => {
				console.log(`Deploy to ${chain.name}`);
			}}
		>
			Deploy
		</button>
	);
}

export default DeployButton;
