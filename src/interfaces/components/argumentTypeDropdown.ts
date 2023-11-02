import { Argument } from "../data/arguments";

export interface IArgumentTypeDropdown {
	solidityTypes: string[];
	argumentList: Argument[] | null;
	setArgumentList: React.Dispatch<React.SetStateAction<Argument[] | null>>;
	argumentId: string;
}
