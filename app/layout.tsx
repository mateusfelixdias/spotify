import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import Sidebar from './components/Sidebar';

import IChildren from './interfaces/children';

import './globals.css';

const figtree = Figtree({ subsets: ['latin-ext'] });

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Escute suas músicas favortitas!',
};

export default function RootLayout({ children }: IChildren) {
  return (
    <html lang="pt-BR">
      <body className={figtree.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
