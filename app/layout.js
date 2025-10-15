import './globals.css'

export const metadata = {
  title: 'TechBlog - Latest Tech Insights',
  description: 'Exploring the latest in web development, AI, and software engineering',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
