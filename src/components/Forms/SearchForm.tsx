'use client';
import { useRef } from 'react';

interface Props {
  query: string;
  onChangeAction: (value: string) => void;
  onSubmitAction: () => void;
}

export function SearchForm({ query, onChangeAction, onSubmitAction }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="animate-fadeIn relative w-[clamp(20rem,50vw,60rem)]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitAction();
      }}
    >
      <input
        type="text"
        value={query}
        ref={inputRef}
        onChange={(e) => onChangeAction(e.target.value)}
        placeholder="Search..."
        className="h-24 w-full rounded-full border-1 border-solid border-white/20 bg-[#100f10] px-8 text-2xl text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.8)] focus:shadow-[0_0_12px_rgba(255,255,255,0.8)] focus:outline-none"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-0 h-full -translate-y-1/2 rounded-r-full border-1 border-l border-solid border-white/20 px-8 text-2xl text-[#878d98] transition-all duration-300 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.8)]"
      >
        Submit
      </button>
    </form>
  );
}
