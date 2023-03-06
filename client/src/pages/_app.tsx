import { GlobalBodyStyles } from '../components/body'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // this is the Provider from the Chakra UI library provides access to the Chakra UI components
    <ChakraProvider>
      <GlobalBodyStyles />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
