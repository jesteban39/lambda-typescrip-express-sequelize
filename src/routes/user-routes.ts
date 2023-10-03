import type { Request, Response } from 'express'
//import { RouteError } from '@declarations/classes'
//import { IReq, IRes } from '@declarations/types'
import { Router } from 'express'
import all from '@controllers/user/all'
import add from '@controllers/user/add'
// **** Setup user routes **** //

export const route = Router()

// **** Variables **** //

// Paths
export const paths = {
  basePath: '/users',
  get: '/all',
  add: '/add',
  update: '/update',
  delete: '/delete/:id',
} as const

route.get(paths.get, all)
route.post(paths.add, add)

export default {
  getAll: route,
  paths
}
