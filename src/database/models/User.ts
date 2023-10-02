import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

export const defineUser = (sequelize: Sequelize) => {

  return sequelize.define('User',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUID
      },
      primerNombre: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'usuario',
      freezeTableName: true,
      underscored: true
    }
  )
}

export default defineUser