import EnvVars from '@envVars'
import app from './server'
import db from '@db'
import { mekeDocs } from './swagger/mekeDocs'

db.open()
  .then(() => {
    console.log('Base de datos conectada')
    mekeDocs()
    app.listen(EnvVars.port, (error: void ) => {
      const err: any = error
      if (err) console.error(error)
      else console.log('Server abierto en puerto: ', EnvVars.port)
    })
  })
  .catch(error => console.error(error))
