import get from './get'
import getWithPaginate from './getWithPaginate'

const reducer = (params) => (acc, [ key, value ]) => ({ ...acc, [key]: value(...params) })

const functions = {
  get,
  getWithPaginate
}

export default (...params) => {
  const onReducer = reducer(params)

  return Object
    .entries(functions)
    .reduce(onReducer, {})
}
