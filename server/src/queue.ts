import amqp from 'amqplib'
import { Request } from 'express'
import {
  getCandleStickData,
  getChartImage,
  paintChart,
  transformDataToCandlestickFormat,
} from './utils'

export const sendRequestToQueue = async (req: Request) => {
  const queue = 'tasks'
  const conn = await amqp.connect('amqp://localhost')

  const channel = await conn.createChannel()
  await channel.assertQueue(queue)
  channel.sendToQueue(queue, Buffer.from(req.body.data))
  channel.close()
}

export const processQueueRequest = async () => {
  const queue = 'tasks'
  const conn = await amqp.connect('amqp://localhost')

  const channel = await conn.createChannel()
  await channel.assertQueue(queue)
  console.log('ready to process request')
  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const { asset, interval } = JSON.parse(msg.content.toString())
      const data = await getCandleStickData({ asset, interval })
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
