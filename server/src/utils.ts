import axios from 'axios'
import { jsPDF } from 'jspdf'
import { consumerSocket } from '.'
import dotenv from 'dotenv'

dotenv.config()
const plotly = require('plotly')(
  process.env.PLOTLY_USERNAME,
  process.env.PLOTLY_API_KEY
)

type BinanceCandlestickResponse = [
  openTime: number,
  open: string,
  high: string,
  low: string,
  close: string,
  volume: string,
  closeTime: number,
  quoteAssetVolume: string,
  numberOfTrades: number,
  takerBuyBaseAssetVolume: string,
  takerBuyQuoteAssetVolume: string,
  ignore: string
][]

export const transformDataToCandlestickFormat = (
  data: BinanceCandlestickResponse
) => {
  const candlestickData = data.map((candle) => {
    return {
      x: new Date(candle[0]),
      y: [candle[1], candle[2], candle[3], candle[4]],
      type: 'box',
    }
  })
  return candlestickData
}

export const getCandleStickData = async () => {
  let response: any
  try {
    response = await axios.get(
      `https://data.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=15`
    )
  } catch (error) {
    console.log(
      '🚀 ~ file: queue.ts:46 ~ coincapGetCandlestickData ~ error:',
      error
    )
    response = null
  }
  return response ? (response.data as BinanceCandlestickResponse) : null
}

export const paintChart = async (
  data: { x: Date; y: string[]; type: string }[]
) => {
  var layout = {
    yaxis: {
      title: 'High Low Open Close',
      zeroline: true,
    },
    boxmode: 'group',
    fileopt: 'overwrite',
    filename: 'crypto-candlestick',
  }

  await plotly.plot(data, layout, (err: any, msg: any) => {
    if (err) return console.log(err)

    console.log(msg)
  })
}

export const getChartImage = async () => {
  plotly.getFigure('jonandereg', '4', async (err: any, fig: any) => {
    if (err) return console.log(err)

    const imageOpts = { format: 'png', width: 1000, height: 500 }
    plotly.getImage(
      fig,
      imageOpts,
      async function (error: any, imageStream: any) {
        if (error) return console.log(error)
        processImageStream(imageStream)
      }
    )
  })
}

const processImageStream = (imageStream: any) => {
  const buffer: any[] | Uint8Array[] = []
  imageStream.on('data', (chunk: any) => {
    buffer.push(chunk)
  })

  imageStream.on('end', async () => {
    const file = Buffer.concat(buffer)

    consumerSocket.emit('message', createPdf(file))

    console.log('pdf created')
  })
}

const createPdf = async (file: Buffer) => {
  const pdf = new jsPDF()

  pdf.addImage(file.toString('base64'), 'PNG', 0, 0, 210, 100)
  const blob = pdf.output('blob')
  return blob
}
