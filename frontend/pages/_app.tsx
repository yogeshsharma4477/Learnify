import Header from '@/component/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <RecoilRoot>
          <Header />
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </>
  )
}
