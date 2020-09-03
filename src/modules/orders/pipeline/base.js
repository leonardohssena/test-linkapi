export default async (req, _, next) => {
  const pipeline = [
    {
      $project: {
        _id: 0
      }
    }
  ]

  req.setPipeline(pipeline)

  next()
}
