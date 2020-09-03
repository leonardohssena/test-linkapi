const count = {
  $group: {
    _id: null,
    count: { $sum: 1 }
  }
}

export {
  count
}
