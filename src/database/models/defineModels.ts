import type { Sequelize } from 'sequelize'

import defineUser from './User.js'

export const defineModels = (sequelize: Sequelize) => {

    const User = defineUser(sequelize)

    /* ~~~~~~~ Relaciones entre tablas ~~~~~~~ */

}

export default defineModels