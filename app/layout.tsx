import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import './globals.css'

const figtree = Figtree({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Escute suas músicas favortitas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={figtree.className}>{children}</body>
    </html>
  )
}
