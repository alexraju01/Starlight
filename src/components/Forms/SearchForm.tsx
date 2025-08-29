"use client";
import { useRef } from "react";

interface Props {
	query: string;
	onChangeAction: (value: string) => void;
	onSubmitAction: () => void;
}

export function SearchForm({ query, onChangeAction, onSubmitAction }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<form
			className='relative w-[clamp(20rem,50vw,60rem)] animate-fadeIn'
			onSubmit={(e) => {
				e.preventDefault();
				onSubmitAction();
			}}>
			<input
				type='text'
				value={query}
				ref={inputRef}
				onChange={(e) => onChangeAction(e.target.value)}
				placeholder='Search...'
				className='w-full h-24 rounded-full bg-[#100f10] px-8 text-white text-2xl  border-1 border-solid border-white/20 transition-all duration-300 focus:outline-none focus:shadow-[0_0_12px_rgba(255,255,255,0.8)] hover:shadow-[0_0_12px_rgba(255,255,255,0.8)]'
			/>
			<button
				type='submit'
				className='absolute right-0 top-1/2 -translate-y-1/2 h-full px-8 text-2xl text-[#878d98] border-l border-1 border-solid border-white/20 rounded-r-full transition-all duration-300 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.8)]'>
				Submit
			</button>
		</form>
	);
}
