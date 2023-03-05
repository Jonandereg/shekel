import Head from 'next/head'

import { Box, Button } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000')
export default function Home() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  console.log('🚀 ~ file: index.tsx:12 ~ isConnected:', isConnected)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      setIsConnected(false)
    })
    socket.on('message', (result) => {
      console.log('🚀 ~ file: index.tsx:18 ~ socket.on ~ result', result)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('message')
    }
  }, [])

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
          onClick={async () => {
            try {
              await postToServer()
            } catch (error) {
              console.log('🚀 ~ file: index.tsx:28 ~ onClick={ ~ error:', error)
            }
          }}
        >
          Button
        </Button>
      </Box>
    </>
  )
}

const postToServer = async () => {
  const request = await axios.post('http://localhost:4000', {
    data: 'hello world from client',
  })
  return request
}
