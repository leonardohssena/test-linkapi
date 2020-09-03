import moment from 'moment'

const periodDate = (key, period) => {
  const [ start, end ] = period.split(',')

  const value = {
    $gt: moment(start).startOf('day').toDate(),
    $lt: moment(end).endOf('day').toDate()
  }

  return { key, value }
}

const periodValue = (key, period) => {
  const [ start, end ] = period.split(',')

  const value = {
    $gte: Number(start),
    $lte: Number(end)
  }

  return { key, value }
}

export { periodDate, periodValue }
