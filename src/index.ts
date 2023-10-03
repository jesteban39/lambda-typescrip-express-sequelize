import EnvVars from '@envVars'
import app from './server'
import db from '@db'
import { mekeSwagger } from './swagger/mekeSwagger'

db.open()
  .then(() => {
    console.log('Base de datos conectada')
    mekeSwagger()
    app.listen(EnvVars.port, (error: void ) => {
      const err: any = error
      if (err) console.error(error)
      else console.log('Server abierto en puerto: ', EnvVars.port)
    })
  })
  .catch(error => console.error(error))
