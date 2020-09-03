import aggregatePaginate from '../support/aggregatePaginate'

export default (Schema) => async (req, res, next) => {
  try {
    const {
      filters = {}, autoInject = {}, pipeline = [], sort, paginate
    } = req

    const pipes = [
      { $match: { ...filters, ...autoInject } },
      ...pipeline,
      { $sort: { ...sort } }
    ]

    const data = await aggregatePaginate(Schema, pipes, paginate)

    res.status(200).send({ status: 200, message: 'getSuccess', data })
  } catch (err) {
    res.status(409).send({ status: 409, message: 'getError', error: err.message || err })
  } finally {
    next()
  }
}
