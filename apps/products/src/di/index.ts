const APP = {
  CONFIG: Symbol('APP_CONFIG'),
}

const DATABASE = {
  CONFIG: Symbol('DATABASE_CONFIG'),
  CLIENT: Symbol('DATABASE_CLIENT'),
}

const NOTIFICATION = {
  CLIENT: Symbol('NOTIFICATION_CLIENT'),
}

export const DI = {
  APP,
  DATABASE,
  NOTIFICATION,
}
