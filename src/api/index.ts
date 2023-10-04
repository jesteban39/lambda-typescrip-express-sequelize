import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import statusCodes from '@statusCodes'
import db from '@db'
import type { Model, ModelStatic } from 'sequelize'

interface Controller {
    path: string
    controller:  Function
    //(Model: ModelStatic<Model<any, any>>, data?: any) => Promise<Model<any, any>[] | Model<any, any>>
    exclude: string[]
}

interface Controllers { [name: string]: Controller }

export const routes = Router()

export const controllers: Controllers = {
    all: {
        path: '/all',
        controller: (Model: ModelStatic<Model<any, any>>) => Model.findAll(),
        exclude: [],
    },
    add: {
        path: '/add',
        controller: (Model: ModelStatic<Model<any, any>>, data: Model<any, any>) => Model.create({...data}),
        exclude: [],
    }
}

const assignController = async (req: Request, res: Response, next: NextFunction) => {
    const { modelName, action } = req.params
    const Model = db.getModels()[modelName]
    const controller = controllers[action].controller
    if (!Model || !controller) return next()
    const result = await controller(Model)
    return res.status(statusCodes.OK).json(result)
}

// **** Setup routes **** //

routes.use('/:modelName/:action', assignController)

export default routes



