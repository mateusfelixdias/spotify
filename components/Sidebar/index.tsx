'use client';

import ISong from '@/interfaces/song';

import { twMerge } from 'tailwind-merge';

import Box from '../Box';
import Library from '../Library';
import SidebarItem from '../SidebarItem';

import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

import usePlayer from '@/hooks/usePlayer';

import { ReactNode, useMemo } from 'react';

import { usePathname } from 'next/navigation';

interface Props {
  songs: ISong[];
  children: ReactNode;
}

const Sidebar = ({ children, songs }: Props) => {
  const player = usePlayer();
  const pathName = usePathname();

  const isSearch = pathName === '/search';

  const routes = useMemo(
    () => [
      { icon: HiHome, label: 'Home', active: !isSearch, href: '/' },
      { icon: BiSearch, label: 'Pesquisar', active: isSearch, href: '/search' },
    ],
    [pathName]
  );

  return (
    <div
      className={twMerge(
        'flex h-full',
        player.activeId ? 'h-[calc(100%-5rem)]' : ''
      )}
    >
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[18.75rem] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>

        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>

      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default Sidebar;
