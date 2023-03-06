import express, { Application } from 'express'
import cors from 'cors'
import router from './routes'
import { processQueueRequest } from './queue'
import socketIO from 'socket.io'

import { createServer } from 'http'

// Boot express
const app: Application = express()
const port = 4000
const server = createServer(app)
// Boot socket.io
const io = new socketIO.Server(server, {
  cors: {
    origin: '*',
  },
})
// Boot socket.io namespace
io.on('connection', (socket) => {
  console.log('client connected: ', socket.id)

  socket.on('disconnect', (reason) => {
    console.log(reason)
  })
})
export const consumerSocket = io.of('/')

// Application routing
app.use(cors())
app.use(express.json())
app.use(router)
// Start queue processing
processQueueRequest()

// Start server
server.listen(port, () => console.log(`Server is listening on port ${port}!`))
