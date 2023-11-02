import { Argument } from "../data/arguments";

export interface IArgumentButton {
	add?: boolean;
	argumentList: Argument[] | null;
	setArgumentList: React.Dispatch<React.SetStateAction<Argument[] | null>>;
	argumentId?: string;
}
