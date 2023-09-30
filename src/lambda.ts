import serverless from 'serverless-http'
import type { APIGatewayEvent, Context, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import server from '@server'
import db from '@db'

export const lambdaHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
  try {
    await db.open()
    return <APIGatewayProxyResult>await serverless(server)(event, context)
  } catch (error) {
    console.error(error)
    return {
      isBase64Encoded: false,
      statusCode: error.statusCode || error.status || 500,
      body: JSON.stringify({ Error: error.message || error }),
      headers: { "content-type": "application/json" }
    }
  } finally {
    await db.close()
  }
}