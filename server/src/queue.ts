import amqp from 'amqplib'
import { Request } from 'express'
import {
  getCandleStickDataFromBinance,
  getChartImage,
  paintChart,
  transformDataToCandlestickFormat,
} from './utils'

// function to send a request to the queue
export const sendRequestToQueue = async (req: Request) => {
  const queue = 'tasks'
  const conn = await amqp.connect('amqp://localhost')

  const channel = await conn.createChannel()
  await channel.assertQueue(queue)
  channel.sendToQueue(queue, Buffer.from(req.body.data))
  channel.close()
}

// function to process a request from the queue
export const processQueueRequest = async () => {
  const queue = 'tasks'
  const conn = await amqp.connect('amqp://localhost')

  const channel = await conn.createChannel()
  await channel.assertQueue(queue)
  console.log('ready to process request')
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const { asset, interval } = JSON.parse(msg.content.toString())
      const data = await getCandleStickDataFromBinance({ asset, interval })
      if (data) {
        const transformedData = transformDataToCandlestickFormat(data)
        await paintChart(transformedData)
        await getChartImage()
      }
      channel.ack(msg)
    } else {
      console.log('Consumer cancelled by server')
    }
  })
}
