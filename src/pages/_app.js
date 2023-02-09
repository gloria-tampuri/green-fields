import '@/styles/globals.css'
import { DeleteContextProvider } from 'Context/DeleteContext'
import {SessionProvider} from 'next-auth/react'

export default function App({ Component, pageProps,session }) {
  return (
    <SessionProvider session={session}>
      <DeleteContextProvider>
      <Component {...pageProps} />
      </DeleteContextProvider>
    </SessionProvider>
  )
}
