import { params } from 'helpers/validator'
import openpay from 'core/openpay'

const card = async (request, response) => {
  const propsSchema = {
    path: { type: 'string' },
    iva: { minLength: 1 },
    subtotal: { minLength: 1 },
    deviceId: { minLength: 1 },
    token: { minLength: 2 },
    name: { type: 'string', minLength: 5 },
    phone: { type: 'string', minLength: 10 },
    mail: { type: 'email' },
    amount: { type: 'string' },
    redirect_url: { type: 'string' }
  }

  const errorParams = params(propsSchema, request.body)

  if (errorParams) {
    return response.error({ statusCode: 400, errorMessage: errorParams })
  }

  const chargePayload = {
    capture: true,
    order_id: request.body.path,
    currency: 'MXN',
    method: 'card',
    description: 'checkout',
    redirect_url: request.body.redirect_url,
    source_id: request.body.token,
    amount: request.body.amount,
    device_session_id: request.body.deviceId,
    use_3d_secure: true,
    customer: {
      email: request.body.mail,
      name: request.body.name
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

export default card
