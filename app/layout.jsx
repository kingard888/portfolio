import './globals.css'

export const metadata = {
  title: 'Veryard — Developer Portfolio',
  description: 'Portfolio pribadi Veryard / Verd­yan Arda.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
