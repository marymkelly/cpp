import { combineClassNames } from "../../lib/utils";

interface SquareButtonProps {
	label?: string;
	type?: "button" | "submit" | "reset";
	classNames?: string;
	inverse?: boolean;
}

export default function SquareButton(props: SquareButtonProps) {
	const { type = "button", label, classNames, inverse } = props;

	return (
		<button
			type={type}
			className={combineClassNames(
				inverse
					? "border-[1.75px] border-logo-green/75 bright text-logo-green hover:border-custom-green-darker-green/75 hover:text-custom-green-darker-green"
					: "bg-logo-green text-white hover:bg-custom-green-darker-green",
				"my-1 inline-flex min-h-[40px] items-center justify-center px-4 py-1 font-semibold tracking-wide",
				classNames
			)}>
			{label}
		</button>
	);
}
