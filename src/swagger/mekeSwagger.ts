import yaml from 'js-yaml'
import fs from 'fs'
import { mekeSchemas } from './mekeSchemas'
import envVals from '@envVars'

export const mekeSwagger = () => {

    if (envVals.nodeEnv !== 'development')
        throw new Error('Solo se puede contruir swagger en ambiente de desarrollo')

    const swaggerObject = {
        openapi: '3.0.0',
        info: {
            title: 'lambda-typescript-express-sequelizeipt',
            description: 'ducumentacion de la api tablero de incidentes',
            version: '1.0.0',
            servers: [`http://localhost:4000`]
        },
        paths: '',
        components: {
            parameters: '',
            definitions: '',
            schemas: mekeSchemas(),
            tags: ''
        }
    }

    fs.writeFileSync('./src/swagger/swagger.yml', yaml.dump(swaggerObject), 'utf8')
    fs.writeFileSync('./src/swagger/swagger.json', JSON.stringify(swaggerObject), 'utf8')
}