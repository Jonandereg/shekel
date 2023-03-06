import { HomeScreen } from '../screens'
import Head from 'next/head'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useToast } from '@chakra-ui/react'
import { onReceiveMessage } from '../utils/helpers'

const socket = io('http://localhost:4000')
export default function Home() {
  const toast = useToast()

  const [isConnected, setIsConnected] = useState(socket.connected)
  console.log('🚀 ~ file: index.tsx:10 ~ Home ~ isConnected:', isConnected)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      setIsConnected(false)
    })
    socket.on('message', (result) => {
      onReceiveMessage(result)
      toast({
        title: 'Download pdf file',
        description: 'Your pdf has been generated',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('message')
    }
  }, [toast])

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
      <HomeScreen />
    </>
  )
}
