import { Request } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { requestLogger } from '../logger/request.logger'

@Middleware({ type: 'before' })
export class RequestMiddleware implements ExpressMiddlewareInterface {
    use(request: Request, _: Response, next: (err?: Error) => object) {
        requestLogger(`${request.originalUrl} - ${request.method} - ${request.ip}`)
        next()
    }
}
