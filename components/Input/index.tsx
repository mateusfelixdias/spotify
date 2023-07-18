import { twMerge } from 'tailwind-merge';

import { InputHTMLAttributes, forwardRef } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ type, disabled, className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        type={type}
        disabled={disabled}
        className={twMerge(
          'flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none',
          className
        )}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
