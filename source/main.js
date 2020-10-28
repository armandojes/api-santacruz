/* eslint-disable handle-callback-err */
import { Router } from 'express'
import { json } from 'body-parser'
import response from './middlewares/response'
import TokenExtract from 'express-bearer-token'
import payments from './modules/payments'
import cors from 'cors'
const functions = require('firebase-functions')

const router = Router()

// define middlewares
router.use(cors())
router.use(json())
router.use(response)
router.use(TokenExtract())

// modules
router.use('/payments', payments)

// 404 error handler
router.use((request, response) => {
  response.error({
    statusCode: 404,
    path: request.url,
    method: request.method,
    errorMessage: 'path not found'
  })
})

exports.main = functions.https.onRequest(router)
