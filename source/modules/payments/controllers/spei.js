import { params } from 'helpers/validator'
import openpay from 'core/openpay'

const spei = async (request, response) => {
  const propsSchema = {
    path: { type: 'string' },
    iva: { minLength: 1 },
    subtotal: { minLength: 1 },
    deviceId: { minLength: 1 },
    name: { type: 'string', minLength: 5 },
    phone: { type: 'string', minLength: 10 },
    mail: { type: 'email' },
    amount: { type: 'string' }
  }

  const errorParams = params(propsSchema, request.body)

  if (errorParams) {
    return response.error({ statusCode: 400, errorMessage: errorParams })
  }

  const chargePayload = {
    order_id: request.body.path,
    currency: 'MXN',
    method: 'bank_account',
    description: 'checkout',
    amount: request.body.amount,
    device_session_id: request.body.deviceId,
    customer: {
      email: request.body.mail,
      name: request.body.name,
      phone_number: request.body.phone
    }
  }

  openpay.charges.create(chargePayload, async (error, charge) => {
    console.log('error', error, charge)
    if (error) {
      return response.error({ errorMessage: error })
    } else {
      return response.success({ charge })
    }
  })
}

export default spei
