import swaggerUi from 'swagger-ui-express'
import fs from 'fs'

const swaggerJson = fs.readFileSync('./src/swagger/swagger.json', 'utf8')

export const serve = swaggerUi.serve
export const setup = swaggerUi.setup(JSON.parse(swaggerJson))