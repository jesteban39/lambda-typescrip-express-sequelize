import 'module-alias/register'
import EnvVars from '@config/EnvVars'
import app from './server'
import db from '@db'

db.open()
  .then(() => {
    console.log('Base de datos conectada')
    app.listen(EnvVars.port, (error: void ) => {
      const err: any = error
      if (err) console.error(error)
      else console.log('Server abierto en puerto: ', EnvVars.port)
    })
  })
  .catch(error => console.error(error))
