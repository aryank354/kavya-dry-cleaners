import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kavya Dry Cleaners',
  description: 'Premium Care. Clean Clothes in 24hrs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-800 pb-24`}>
        {children}
      </body>
    </html>
  )
}