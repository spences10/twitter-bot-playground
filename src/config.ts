import * as dotenv from 'dotenv'

export class Config implements IConfig {
  CONSUMER_KEY: string
  CONSUMER_SECRET: string
  ACCESS_TOKEN: string
  ACCESS_TOKEN_SECRET: string

  constructor() {
    let config = dotenv.config({ path: '.env' }).parsed

    this.CONSUMER_KEY = config.CONSUMER_KEY
    this.CONSUMER_SECRET = config.CONSUMER_SECRET
    this.ACCESS_TOKEN = config.ACCESS_TOKEN
    this.ACCESS_TOKEN_SECRET = config.ACCESS_TOKEN_SECRET
  }
}

export interface IConfig {
  CONSUMER_KEY: string
  CONSUMER_SECRET: string
  ACCESS_TOKEN: string
  ACCESS_TOKEN_SECRET: string
}
