import { Router } from 'express'

import { filter } from '../../../middleware'
import { base } from '../pipeline'

import { Functions } from '../support'

const Routes = Router()
  .get(
    '/',
    filter({
      title: 'string',
      value: 'periodValue',
      date: 'periodDate'
    }),
    base,
    Functions.get
  )
  .get(
    '/paginate',
    filter({
      title: 'string',
      value: 'periodValue',
      date: 'periodDate'
    }),
    base,
    Functions.getWithPaginate
  )

export default Routes
