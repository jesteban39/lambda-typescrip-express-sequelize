import * as e from 'express';
import { Query } from 'express-serve-static-core';


// **** Misc **** //

export type TAll = string | number | boolean | null | object;


// **** Express **** //

export interface IReq extends e.Request {
}

export interface IReqQuery extends e.Request {
  query: Query;
  body: void;
}

export interface IRes extends e.Response {
  locals: {};
}
