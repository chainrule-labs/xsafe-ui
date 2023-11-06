import { Combobox, Transition } from "@headlessui/react";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import { IArgumentTypeDropdown } from "../../interfaces";

function ArgumentTypeDropDown({
	solidityTypes,
	argumentList,
	setArgumentList,
	argumentId,
}: IArgumentTypeDropdown) {
	const [query, setQuery] = useState("");
	const [selectedType, setSelectedType] = useState<string>("");

	const filteredTypes =
		query === ""
			? solidityTypes
			: solidityTypes.filter((type) =>
					type.toLowerCase().includes(query.toLowerCase())
			  );

	const handleTypeChange = (newType: string) => {
		setSelectedType(newType);
		if (!argumentList || !argumentId) return;

		const updatedList = argumentList.map((arg) => {
			if (arg.id === argumentId) {
				return { ...arg, type: newType, value: "", isValid: false };
			}
			return arg;
		});

		setArgumentList(updatedList);
	};

	return (
		<Combobox
			as="div"
			className="flex h-10 w-36 shrink-0 flex-col items-center justify-center outline-none"
			value={selectedType}
			onChange={handleTypeChange}
		>
			{({ open }) => (
				<div className="relative h-10 w-full">
					<div className="relative flex h-10 w-full items-center justify-between overflow-hidden bg-dark-500 px-2 outline-none ring-1 ring-dark-200 focus-within:ring-1 focus-within:ring-dark-100">
						<Combobox.Input
							className="w-full border-none bg-dark-500 outline-none"
							displayValue={(type) =>
								selectedType ? (type as string) : ""
							}
							placeholder="Select..."
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className="flex w-10 items-center justify-center hover:text-primary-100">
							<AiFillCaretDown className="h-8" />
						</Combobox.Button>
					</div>
					<Transition show={open} afterLeave={() => setQuery("")}>
						<Combobox.Options
							static
							className={`${
								open && "relative z-10"
							} mt-2 max-h-64 overflow-hidden overflow-y-auto bg-dark-600 outline-none ring-1 ring-dark-200`}
						>
							{filteredTypes.map((type) => (
								<Combobox.Option
									key={type}
									value={type}
									className="p-1"
								>
									{({ selected, active }) => (
										<div
											className={`${
												active &&
												"bg-dark-400 text-primary-100"
											} ${
												selected &&
												!active &&
												"bg-dark-500"
											} group flex w-full cursor-pointer items-center p-2 text-sm`}
										>
											<span
												className={`${
													selected
														? "font-semibold"
														: "font-normal"
												}`}
											>
												{type}
											</span>
										</div>
									)}
								</Combobox.Option>
							))}
						</Combobox.Options>
					</Transition>
				</div>
			)}
		</Combobox>
	);
}

export default ArgumentTypeDropDown;
