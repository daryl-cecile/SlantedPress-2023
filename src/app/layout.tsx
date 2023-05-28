import ClientMantineProvider from '@/components/providers/mantine'
import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/nav'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SlantedPress',
  description: 'Independent online magazine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ClientMantineProvider>
          <body className={inter.className}>
            <NavBar />
            {children}
          </body>
        </ClientMantineProvider>
      </html>
    </ClerkProvider>
  )
}
