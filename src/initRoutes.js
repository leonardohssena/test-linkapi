/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import fs from 'fs'

const base = '/api/v1'

const start = (app) => (MODULE) => {
  try {
    const Route = require(`${__dirname}/modules/${MODULE}/routes`).default
    const path = `${base}/${MODULE}/`
    app.use(path, Route)
  } catch (err) {
    console.log(err)
  }
}

export default (app) => {
  const makeStart = start(app)

  const modules = fs.readdirSync(`${__dirname}/modules`)
  modules
    .forEach(makeStart)

  app.use(({ originalUrl }, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Invalid Route.',
      route: originalUrl
    })
    next()
  })
}
