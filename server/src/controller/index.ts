import { Request, Response } from 'express'
import { sendRequestToQueue } from '../queue'

export const requestPdfTest = async (req: Request, res: Response) => {
  console.log('🚀 ~ file: index.ts:6 ~ requestPdfTest ~ req:', req.body)
  await sendRequestToQueue(req)
  res.status(202).send({ data: 'Your request is being processed' })
}
