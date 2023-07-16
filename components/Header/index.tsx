'use client';

import Button from '../Button';

import { ReactNode } from 'react';

import { twMerge } from 'tailwind-merge';

import { useRouter } from 'next/navigation';

import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';

interface Props {
  className?: string;
  children: ReactNode;
}

const Header = ({ children, className }: Props) => {
  const router = useRouter();

  const onLogout = () => {};

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretLeft
              size={35}
              className="text-white"
              onClick={() => router.back()}
            />
          </button>

          <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
            <RxCaretRight
              size={35}
              className="text-white"
              onClick={() => router.forward()}
            />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome size={20} className="text-black" />
          </button>

          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch size={20} className="text-black" />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button className="bg-transparent text-neutral-300 font-medium">
                Inscreva-se
              </Button>
            </div>

            <div>
              <Button className="bg-white px-6 py-2">Entrar</Button>
            </div>
          </>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
