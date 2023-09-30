/* eslint-disable node/no-process-env */

export default {
  nodeEnv: (process.env.NODE_ENV ?? ''),
  port: Number(process.env.PORT ?? 80),
  dbName: (process.env.DB_NAME ?? ''),
  dbUser: (process.env.DB_USER ?? ''),
  dbHost: (process.env.DB_HOST ?? ''),
  dbPass: (process.env.DB_PASSWORD ?? ''),
  dbport: Number(process.env.DB_PORT ?? 3306),
  cookieProps: {
    key: 'lambda-typescrip-express-sequelize',
    secret: (process.env.COOKIE_SECRET ?? '')
  }
} as const;
