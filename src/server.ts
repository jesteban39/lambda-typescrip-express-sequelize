import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import logger from 'jet-logger'
import helmet from 'helmet'

import { setup, serve } from './swagger'
import api from './routes/api'
import envVars from '@envVars'
import statusCodes from '@statusCodes'
import { NodeEnvs } from '@declarations/enums'
import { RouteError } from '@declarations/classes'

// **** Init express **** //

// deepcode ignore UseCsurfForExpress: <se usa jwt en su lugar>
const app = express()

// **** Set basic express settings **** //

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Show routes called in console during development
if (envVars.nodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'))
}

// Security
if (envVars.nodeEnv === NodeEnvs.Production) {
  app.use(helmet())
}

// Docs
app.use('/swagger', serve, setup)

// Add APIs
app.use('/api', api)

// Setup error handler
app.use((
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  logger.err(err, true)
  let status = statusCodes.BAD_REQUEST
  if (err instanceof RouteError) {
    status = err.status
  }
  return res.status(status).json({ error: err.message })
})

export default app
