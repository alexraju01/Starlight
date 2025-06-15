import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: ReactNode;
	children: ReactNode;
}

export default function Button({ icon, children, ...props }: ButtonProps) {
	return (
		<button
			className={`
        flex items-center gap-4 bg-white text-black border-none
        px-5 py-2.5 text-lg font-bold rounded-xl cursor-pointer
        transition-all duration-300 ease-in-out mb-6
        hover:scale-110
        disabled:opacity-25 disabled:cursor-not-allowed
      `}
			{...props}>
			{icon && <i>{icon}</i>}
			<p>{children}</p>
		</button>
	);
}
