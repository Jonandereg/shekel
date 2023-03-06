import axios from 'axios'

// This function sends the data to the server that triggers the pdf generation server should return a 202 status code and process the request independently
export const postToServer = async (opts: {
  asset: string
  interval: string
}) => {
  const request = await axios.post('http://localhost:4000/getPdf', {
    data: JSON.stringify(opts),
  })
  return request
}

// This function takes the result from the server and downloads the pdf
export const onReceiveMessage = (result: string) => {
  const a = document.createElement('a')
  a.download = 'generated.pdf'
  a.href = result
  a.click()
}
