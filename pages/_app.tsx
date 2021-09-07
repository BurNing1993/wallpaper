import type { AppProps } from 'next/app'
import Head from 'next/head'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wallpaper</title>
        <meta name="description" content="Wallpaper" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}
export default MyApp
