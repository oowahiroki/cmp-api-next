import { Response } from 'express'
import { EventsRespository } from '../repositories/events.repo'
import { Service } from 'typedi'
import { JsonController, Get, Res, Param, Post, Body } from 'routing-controllers'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'

interface EventsRequest {
    id?: string
}

@Service()
@JsonController(Constants.V3)
export class EventsController extends BaseController {
    constructor(private repository: EventsRespository) {
        super()
    }

    @Get('/events')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.repository.getAll(), response)
    }

    @Get('/events/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.repository.findById(id), response)
    }

    @Post('/events')
    async createApplicationA(@Body() body: EventsRequest, @Res() response: Response) {
        return this.successResponse(body, response)
    }
}
