import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

export const defineSupplier = (sequelize: Sequelize) => {

  return sequelize.define('Supplier',
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      empresa: {
        type: DataTypes.STRING,
        allowNull: false
      },
      equipo: {
        type: DataTypes.NUMBER,
        allowNull: true
      }
    },
    {
      tableName: 'proveedor',
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  )
}

export default defineSupplier