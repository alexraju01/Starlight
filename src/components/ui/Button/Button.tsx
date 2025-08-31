import clsx from 'clsx';
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
}

const base = `flex items-center gap-4 bg-white text-black border-none
   px-5 py-2.5 text-lg font-bold rounded-xl cursor-pointer
   transition-all duration-300 ease-in-out mb-6
   hover:scale-110
   disabled:opacity-25 disabled:cursor-not-allowed`;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { icon, children, className, type = 'button', ...rest },
  ref,
) {
  const classes = twMerge(clsx(base, className));

  return (
    <button ref={ref} type={type} className={classes} {...rest}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </button>
  );
});

export default Button;
