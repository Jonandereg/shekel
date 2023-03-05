import { Router } from 'express'
import { requestPdfTest } from '../controller'

const router = Router()

router.post('/', requestPdfTest)

export default router
