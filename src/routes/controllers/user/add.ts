import StatusCodes from '@config/StatusCodes'
import type { Request, Response } from 'express'
import type { User } from '@appTypes/User'
import db from '@db'

interface ReqUser extends Request {
    body: User
}

export const add = async (req: ReqUser, res: Response) => {
    const { User } = db.getModels()
    const newUser = await User.create(req.body)
    return res.status(StatusCodes.OK).json(newUser)
}

export default add