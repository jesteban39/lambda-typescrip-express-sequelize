import HttpStatusCodes from '@config/HttpStatusCodes';
import { RouteError } from '@declarations/classes';
import { paramInvalidErr } from './middlware/validate';
import { IUser } from '@models/User';
//import { IReq, IRes } from '@declarations/types';

import type { Request, Response } from 'express';

// **** Types **** //

interface IReq extends Request {
  body: {
    user: IUser;
  }
}

// **** Variables **** //

// Paths
const paths = {
  basePath: '/users',
  get: '/all',
  add: '/add',
  update: '/update',
  delete: '/delete/:id',
} as const;


// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: Response) {
  //const users = await userService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users: [] });
}

/**
 * Add one user.
 */
async function add(req: IReq, res: Response) {
  const { user } = req.body;
  //await userService.addOne(user);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one user.
 */
async function update(req: IReq, res: Response) {
  const { user } = req.body;
  //await userService.updateOne(user);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one user.
 */
async function _delete(req: IReq, res: Response) {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      paramInvalidErr,
    );
  }
  //await userService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}


// **** Export default **** //

export default {
  paths,
  getAll,
  add,
  update,
  delete: _delete,
} as const;
