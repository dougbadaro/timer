import './globals.css'
import { Unica_One as UnicaOne } from 'next/font/google'

const unicaOne = UnicaOne({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-unica-one',
})

export const metadata = {
  title: 'Timer',
  description: 'Developed by douggbadaro',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="https://cdn-icons-png.flaticon.com/512/27/27133.png" type="image/x-icon" />
      </head>
      <body className={`${unicaOne.variable} h-screen`}>{children}</body>
    </html >
  )
}
