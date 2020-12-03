/* eslint-disable no-unused-vars */
import nodemailer from 'nodemailer'
import * as pdf from 'html-pdf'
import { log } from 'firebase-functions/lib/logger'

const send = async (request, response) => {
  const { html, email, subject } = request.body
  const transporter = nodemailer.createTransport({
    host: 'mail.distribucionessantacruz.com',
    port: 587,
    secure: false,
    name: 'distribucionessantacruz.com',
    auth: {
      user: 'pagosenlinea@distribucionessantacruz.com',
      pass: '2bw!#2T=$$I5'
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  pdf.create(html, {
    height: '30in',
    width: '15in',
    phantomArgs: ['--local-url-access=false']
  }).toBuffer(async (err, buffer) => {
    if (err) {
      log('err', err)
      const info = await transporter.sendMail({
        from: 'pagosenlinea@distribucionessantacruz.com',
        to: email,
        subject: subject || 'Confirmacion de compra',
        html: html
      })
      return response.success({ info })
    } else {
      const info = await transporter.sendMail({
        from: 'pagosenlinea@distribucionessantacruz.com',
        to: email,
        subject: subject || 'Confirmacion de compra',
        html: html,
        attachments: [
          {
            filename: 'recibo.pdf',
            content: buffer,
            contentType: 'application/pdf'
          }
        ]
      })
      return response.success({ info })
    }
  })
}

export default send
