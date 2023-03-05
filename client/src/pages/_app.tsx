import { GlobalBodyStyles } from '../components/body'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <GlobalBodyStyles />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
