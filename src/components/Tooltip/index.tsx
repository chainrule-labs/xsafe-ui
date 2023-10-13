import React from "react";

import { ITooltip } from "../../interfaces/components/tooltip";

function Tooltip({ children, tip }: ITooltip) {
	return (
		<div className="text-light-100 group relative inline-block w-full">
			{children}
			<span className="bg-dark-600 invisible absolute -right-20 mt-4 w-48 rounded-xl py-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
				{tip}
			</span>
		</div>
	);
}

export default Tooltip;
