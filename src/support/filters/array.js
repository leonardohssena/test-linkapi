export default (key, arr) => {
  const value = ({ $in: arr.split(',') })

  return { key, value }
}
