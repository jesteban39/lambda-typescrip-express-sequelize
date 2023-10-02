import EnvVars from '@config/EnvVars'
import app from '@server'
import db from '@db'

db.open()
  .then(() => {
    console.log('Base de datos conectada')
    app.listen(EnvVars.port, (error: void ) => {
      console.log(typeof error)
      if (typeof error === 'string') console.error(error)
      else console.log('Server abierto en puerto: ', EnvVars.port)
    })
  })
  .catch(error => console.error(error))
