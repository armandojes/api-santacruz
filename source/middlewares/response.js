const response = (request, response, next) => {
  response.success = (data = {}) => {
    const { statusCode = 200, ...payload } = data
    response.status(statusCode)
    response.json({
      status: 'success',
      ...payload
    })
    response.end()
  }

  response.error = (data = {}) => {
    var { statusCode = 500, errorMessage = 'Error interno del servidor', ...payload } = data
    response.status(statusCode)
    response.send({
      status: 'error',
      errorMessage: typeof errorMessage === 'string' ? errorMessage : errorMessage.length === 1 ? errorMessage[0] : errorMessage,
      ...payload
    })
  }

  next()
}

export default response
