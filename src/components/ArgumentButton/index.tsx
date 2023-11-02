import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Argument, IArgumentButton } from "../../interfaces";

function ArgumentButton({
	add,
	argumentList,
	setArgumentList,
	argumentId,
}: IArgumentButton) {
	const handleOnClick = () => {
		if (add) {
			const newId = uuidv4();
			const newArgument: Argument = {
				id: newId,
				type: "",
				value: "",
			};
			setArgumentList((prev) =>
				prev ? [...prev, newArgument] : [newArgument]
			);
		} else if (argumentList && argumentId) {
			setArgumentList((prev) => {
				if (!prev) return null;
				const newList = prev.filter((arg) => arg.id !== argumentId);
				return newList.length ? newList : null;
			});
		}
	};

	return (
		<button
			style={
				{
					"--offset-border-color": "#395754", // dark-200
				} as React.CSSProperties
			}
			className="offset-border flex h-10 w-fit shrink-0 items-center justify-center bg-dark-500 px-2 outline-none hover:bg-dark-400 hover:text-primary-100"
			onClick={handleOnClick}
		>
			{add ? "+ Add Argument" : "X"}
		</button>
	);
}

export default ArgumentButton;
