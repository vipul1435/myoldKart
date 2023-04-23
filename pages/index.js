import Head from 'next/head'
import { Inter } from 'next/font/google'
import Content from '@/components/Content'
import Poster from '@/components/poster'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
    <>
      <Head>
        <title>myoldKart</title>
        <meta name="description" content="now feel free for shopping" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Poster></Poster>
      <Content></Content>
    </>
  )
}
