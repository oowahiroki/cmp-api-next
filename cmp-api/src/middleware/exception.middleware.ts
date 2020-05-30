import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers'
import { Request, Response } from 'express'
import { utils } from '../common/util'
import { ValidationError } from 'class-validator'
import { exceptionLogger } from '../logger/exception.logger'

interface ErrorProps extends Error {
    httpCode?: number
    errors?: Array<ValidationError>
}

function extractValidationErrors(errors: Array<ValidationError>): object {
    const customErrors = []
    for (const err of errors) {
        const messages = []
        for (const key in err.constraints) {
            messages.push(err.constraints[key])
        }
        customErrors.push({
            field: err.property,
            message: messages.join(', ')
        })
    }
    return customErrors
}

@Middleware({ type: 'after' })
export class ExceptionMiddleware implements ExpressErrorMiddlewareInterface {
    error(err: ErrorProps, _: Request, response: Response, next: (err?: object) => object): void {
        if (err.httpCode === 400) {
            utils.badRequestResponse(extractValidationErrors(err.errors), response)
        } else {
            exceptionLogger(err)
            utils.internalServerResponse(err.message, response)
        }
        next()
    }
}
