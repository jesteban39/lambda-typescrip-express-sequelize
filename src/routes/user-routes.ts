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

// /**
//  * Add one user.
//  */
// async function add(req: IReq, res: Response) {
//   const { user } = req.body
//   //await userService.addOne(user)
//   return res.status(StatusCodes.CREATED).end()
// }

// /**
//  * Update one user.
//  */
// async function update(req: IReq, res: Response) {
//   const { user } = req.body
//   //await userService.updateOne(user)
//   return res.status(StatusCodes.OK).end()
// }

// /**
//  * Delete one user.
//  */
// async function _delete(req: IReq, res: Response) {
//   const id = parseInt(req.params.id)
//   if (Number.isNaN(id)) {
//     throw new RouteError(
//       StatusCodes.BAD_REQUEST,
//       paramInvalidErr,
//     )
//   }
//   //await userService.delete(id)
//   return res.status(StatusCodes.OK).end()
// }


// // **** Export default **** //

// export default {
//   paths,
//   getAll,
//   add,
//   update,
//   delete: _delete,
// } as const

export default {
  getAll: route,
  paths
}
