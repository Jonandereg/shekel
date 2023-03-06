import axios from 'axios'

export const postToServer = async (opts: {
  asset: string
  interval: string
}) => {
  const request = await axios.post('http://localhost:4000/getPdf', {
    data: JSON.stringify(opts),
  })
  return request
}

export const onReceiveMessage = (result: string) => {
  const a = document.createElement('a')
  a.download = 'generated.pdf'
  a.href = result
  a.click()
}
