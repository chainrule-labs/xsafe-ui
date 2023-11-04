import { Argument } from "../data/arguments";

export interface IArgumentInput {
	argumentList: Argument[] | null;
	setArgumentList: React.Dispatch<React.SetStateAction<Argument[] | null>>;
	argument: Argument;
	setHomeErrorMessage: (value: string) => void;
}
