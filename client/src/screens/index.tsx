import { postToServer } from '../utils/helpers'
import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

// This is the HomeScreen component that is rendered in the Home page
export const HomeScreen = () => {
  const [interval, setInterval] = useState('1d')
  const [asset, setAsset] = useState('BTC')
  const toast = useToast()
  return (
    <Flex
      alignItems="center"
      direction="column"
      backgroundColor="white"
      color="black"
      boxShadow="base"
      minHeight="100vh"
    >
      <Text
        mt={[12, 36]}
        fontSize="4xl"
        fontFamily="Montserrat"
        fontWeight="Light"
      >
        Shekel a crypto assets candlestick generator
      </Text>
      <Flex alignItems={'center'} justifyContent={'space-evenly'}>
        <Box m={12}>
          <Text fontSize="xl" fontFamily="Montserrat" fontWeight="Light">
            {' '}
            Select desired Crypto
          </Text>
          <Select
            placeholder="Select option"
            onChange={(e) => {
              e.preventDefault()
              setAsset(e.currentTarget.value)
            }}
          >
            <option value="BTC">Bitcoin</option>
            <option value="ETH">Ethereum</option>
            <option value="XRP">Ripple</option>
          </Select>
        </Box>
        <Box>
          <Text fontSize="xl" fontFamily="Montserrat" fontWeight="Light" pb={4}>
            {' '}
            Select desired Interval
          </Text>
          <RadioGroup onChange={setInterval} value={interval}>
            <Stack direction="row">
              <Radio value="1h">1h</Radio>
              <Radio value="6h">6h</Radio>
              <Radio value="1d">1d</Radio>
              <Radio value="1w">1w</Radio>
              <Radio value="1M">1M</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Flex>
      <Button
        backgroundColor="black"
        textColor={'white'}
        onClick={async () => {
          try {
            const res = await postToServer({ interval, asset })

            toast({
              title: 'Report requested',
              description: res.data.data,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          } catch (error) {
            console.log('🚀 ~ file: index.tsx:28 ~ onClick={ ~ error:', error)
          }
        }}
      >
        Request Pdf report
      </Button>
    </Flex>
  )
}
