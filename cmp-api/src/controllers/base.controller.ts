import { Response } from 'express'
import { Controller } from 'routing-controllers'

@Controller()
export class BaseController {
    protected successResponse(result: object | string, response: Response) {
        return response.status(200).json(result)
    }
}
