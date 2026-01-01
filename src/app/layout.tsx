import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '起業の科学 - Prompt Portal',
  description: 'スタートアップサイエンスのプロンプト集',
  openGraph: {
    title: '起業の科学 - Prompt Portal',
    description: 'スタートアップサイエンスのプロンプト集',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  )
}
