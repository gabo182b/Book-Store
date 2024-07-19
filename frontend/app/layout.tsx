import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NotistackProvider } from './components/SnackBarProviderClient'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Store',
  description: 'Book store web app',
  icons: {
    icon: [
      '/favicon.ico?=v4'
    ]
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotistackProvider>
          {children}
        </NotistackProvider>
      </body>
    </html>
  )
}
