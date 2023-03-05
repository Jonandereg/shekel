import Head from 'next/head'

import { Box, Button } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Shekel</title>
        <meta
          name="description"
          content="Crypto assets candlestick generator"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box backgroundColor={'black'}>
        <Button
          colorScheme="teal"
          onClick={() => {
            console.log('click')
          }}
        >
          Button
        </Button>
      </Box>
    </>
  )
}
