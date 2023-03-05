import amqp from 'amqplib'
import { Request } from 'express'
import { consumerSocket } from '.'

export const sendRequestToQueue = async (req: Request) => {
  const queue = 'tasks'
  const conn = await amqp.connect('amqp://localhost')

  const channel = await conn.createChannel()
  await channel.assertQueue(queue)
  channel.sendToQueue(queue, Buffer.from(req.body.data))
  console.log('request sent to queue', req.body)
  channel.close()
}

export const processQueueRequest = async () => {
  const queue = 'tasks'
  const conn = await amqp.connect('amqp://localhost')

  const channel = await conn.createChannel()
  await channel.assertQueue(queue)
  console.log('ready to process request')
  channel.consume(queue, (msg) => {
    if (msg !== null) {
      console.log('Recieved:', msg.content.toString())
      consumerSocket.emit('message', msg.content.toString())
      channel.ack(msg)
    } else {
      console.log('Consumer cancelled by server')
    }
  })
}
