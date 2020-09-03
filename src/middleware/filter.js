import * as filters from '../support/filters'

const removeUnfoundKey = (fields) => ([ key ]) => Object.keys(fields).includes(key)
const removeEmpty = ([ _, value ]) => !!value

const transform = (fields) => ([ key, value ]) => filters[fields[key]](key, value)

const reducer = (acc, { key, value }) => ({ ...acc, [key]: value })

export default (fields) => (req, _, next) => {
  const { query } = req

  const filterRemoveUnfoundKey = removeUnfoundKey(fields)
  const mapTransform = transform(fields)

  const filter = Object
    .entries(query)
    .filter(filterRemoveUnfoundKey)
    .filter(removeEmpty)
    .map(mapTransform)
    .reduce(reducer, {})

  req.filters = filter

  next()
}
