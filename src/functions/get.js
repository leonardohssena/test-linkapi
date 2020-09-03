export default (Schema) => async (req, res, next) => {
  try {
    const {
      filters = {}, autoInject = {}, pipeline = [], sort
    } = req

    console.log({ $match: { ...filters, ...autoInject } },
      ...pipeline,
      { $sort: sort })

    const data = await Schema.aggregate([
      { $match: { ...filters, ...autoInject } },
      ...pipeline,
      { $sort: sort }
    ])

    res.status(200).send({ status: 200, message: 'getSuccess', data })
  } catch (err) {
    res.status(409).send({ status: 409, message: 'getError', error: err.message || err })
  } finally {
    next()
  }
}
