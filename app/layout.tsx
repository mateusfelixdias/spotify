import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import Sidebar from '../components/Sidebar';

import IChildren from '../interfaces/children';

import getSongsByUserId from '@/actions/getSongsByUserId';

import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import SupabaseProvaider from '@/providers/SupabaseProvider';

import './globals.css';

const figtree = Figtree({ subsets: ['latin-ext'] });

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Escute suas músicas favortitas!',
};

export const revalidate = 0;

export default async function RootLayout({ children }: IChildren) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="pt-BR">
      <body className={figtree.className}>
        <ToasterProvider />

        <SupabaseProvaider>
          <UserProvider>
            <ModalProvider />

            <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvaider>
      </body>
    </html>
  );
}
