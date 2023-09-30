import { Sequelize } from 'sequelize'
//import { defineModels } from '../models/index.js'
import EnvVars from '@config/EnvVars'

let sequelize = <Sequelize | null> null

export const open = async () => {
  if (sequelize) {
    sequelize.connectionManager.initPools()
    if (sequelize.connectionManager.hasOwnProperty('getConnection')) {
      //delete sequelize.connectionManager.getConnection
      sequelize.connectionManager.getConnection = async () => ({})
    }
    return sequelize
  }

  sequelize = new Sequelize(
    EnvVars.dbName,
    EnvVars.dbUser,
    EnvVars.dbPass,
    {
      host: EnvVars.dbHost,
      dialect: 'mysql',
      dialectOptions: { ssl: 'Amazon RDS' },
      pool: {
        min: 0,
        max: 10,
        idle: 0,
        acquire: 3000,
        evict: 3000
      },
      port: EnvVars.dbport,
      logging: false
    }
  )

  //defineModels(sequelize)
  await sequelize.sync({ force: false, alter: false })
  return sequelize
}

export const close = async () => {
  try {
    if (!sequelize) return
    await sequelize.connectionManager.close()
  } catch (error) {
    console.error(error)
  }
}

export const getModels = () => {
  if (!sequelize) throw new Error('NO se ha creado sequelize')
  return sequelize.models
}

export default { open, close, getModels }