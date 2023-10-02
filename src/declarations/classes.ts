import HttpStatusCodes from '@config/StatusCodes';

/**
 * Error with status code and message
 */
export class RouteError extends Error {
  status: HttpStatusCodes;
  constructor(status: HttpStatusCodes, message: string) {
    super(message);
    this.status = status;
  }
}
