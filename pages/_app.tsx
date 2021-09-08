import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>壁纸🎆</title>
        <meta name="description" content="壁纸🎆" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mt-12">
        <Component {...pageProps} />
      </main>
    </>
  )
}
export default MyApp
