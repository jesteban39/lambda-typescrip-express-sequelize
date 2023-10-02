import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

export const defineUser = (sequelize: Sequelize) => {

  return sequelize.define('User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      primerNombre: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'usuario',
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  )
}

export default defineUser