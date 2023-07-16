import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  children: ReactNode;
}

const Box = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`, className)}
    >
      {children}
    </div>
  );
};

export default Box;
