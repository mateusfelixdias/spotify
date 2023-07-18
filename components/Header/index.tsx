'use client';

import Button from '../Button';

import { ReactNode } from 'react';

import { toast } from 'react-hot-toast';

import { twMerge } from 'tailwind-merge';

import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import useAuthModal from '@/hooks/useAuthModal';

import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { FaUserAlt } from 'react-icons/fa';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';

import { useSupabaseClient } from '@supabase/auth-helpers-react';

interface Props {
  className?: string;
  children: ReactNode;
}

const Header = ({ children, className }: Props) => {
  const router = useRouter();

  const { user } = useUser();
  const { onOpen } = useAuthModal();
  const supabaseClient = useSupabaseClient();

  const onLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();

    router.refresh();

    if (error) return toast.error(error.message);

    toast.success('Desconectado!');
  };

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
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button className="bg-white px-6 py-2" onClick={onLogout}>
                Sair
              </Button>

              <Button
                className="bg-white"
                onClick={() => router.push('account')}
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Inscreva-se
                </Button>
              </div>

              <div>
                <Button className="bg-white px-6 py-2" onClick={onOpen}>
                  Entrar
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Header;
