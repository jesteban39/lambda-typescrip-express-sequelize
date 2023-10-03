import type { ModelAttributeColumnOptions, Model } from 'sequelize'
import db from '@db'

const getTypeOf = (atribute: ModelAttributeColumnOptions<Model<any, any>>): [string, number] => {
    const stringType = atribute.type.toString({})
    const getlength = (stringT: string) => {
        return Number(stringT.replace(/[\D]/ig, '')) || -1
    }
    if (stringType === 'TINYINT(1)') return ['boolean', 1]
    if (stringType.includes('VARCHAR')) return ['string', getlength(stringType)]
    if (stringType.includes('CHAR')) return ['string', getlength(stringType)]
    if (stringType.includes('TEXT')) return ['string', 0]
    if (stringType.includes('DATE')) return ['string', 10]    
    if (stringType.includes('TIME')) return ['string', 8]
    if (stringType.includes('DATETIME')) return ['string', 19]
    if (stringType.includes('INTEGER')) return ['number', 1]
    if (stringType.includes('NUMBER')) return ['number', 1]
    console.log(stringType)
    // if (stringType.includes('')) return ['',]
    return ['', -1]
}

const mekeProperties = (modelName: string) => {
    const Model = db.getModels()[modelName]

    const atributes = Model.getAttributes()

    return Object.keys(atributes).reduce((properties: any, key: string) => {
        const atribute = atributes[key]
        properties[key] = {
            type: getTypeOf(atribute)[0],
            required: !atribute.allowNull,
            description: atribute.comment || `${Model.tableName} ${atribute.field?.replace(/_/g, ' ')}`,
            example: '3973'
        }
        return properties
    }, {})

}

export const mekeSchemas = () => {
    const models = Object.keys(db.getModels())
    return models.reduce((schemas: any, model) => {
        schemas[model] = { properties: mekeProperties(model) }
        return schemas
    }, {})
}
