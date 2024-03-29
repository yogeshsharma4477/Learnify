import Header from '../component/Header'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps?.session}>
          <Header />
          <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
