import * as dotenv from 'dotenv'

const config = dotenv.config({ path: '.env' }).parsed

export = config
