import * as winston from 'winston'

const logger = winston.createLogger({
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logs/database.log' })]
})

export function databaseLogger(info: string) {
    logger.info(info)
}
