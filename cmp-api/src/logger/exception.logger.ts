import * as winston from 'winston'

const errorStackFormat = winston.format(info => {
    return Object.assign({}, info, {
        stack: info.stack,
        message: info.message
    })
})
const logger = winston.createLogger({
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'logs/exception.log' })],
    format: winston.format.combine(winston.format.splat(), errorStackFormat(), winston.format.simple())
})

export function exceptionLogger(err: Error) {
    logger.error(err)
}
