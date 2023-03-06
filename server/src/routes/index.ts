import { Router } from 'express'
import { requestPdfTest } from '../controller'

const router = Router()

router.post('/getPdf', requestPdfTest)
router.get('/', (req, res) => res.send('yes this is server '))

export default router
