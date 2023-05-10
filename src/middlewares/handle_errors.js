import createError from 'http-errors';

export const badRequest = (err, res) => {
  // 400
  const error = createError.BadRequest(err)
  return res.status(error.status).json({
    err: 1,
    mes: error.message
  })
}

export const internalServerError = (res) => {
  // 500
  const error = createError.InternalServerError()
  return res.status(error.status).json({
    err: -1,
    mes: error.message
  })
}

export const notFound = (req, res) => {
  const error = createError.NotFound('This is not found')
  return res.status(error.status).json({
    err: 1,
    mes: error.message
  })
}