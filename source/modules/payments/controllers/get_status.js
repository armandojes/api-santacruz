import openpay from 'core/openpay'

const getStatus = async (request, response) => {
  const paymentId = request.params.id

  openpay.charges.get(paymentId, (error, charge) => {
    if (error) {
      response.error({ errorMessage: error })
    } else {
      response.success({ ...charge })
    }
  })
}

export default getStatus
