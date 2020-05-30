import { Response } from 'express'
import { BlueprintEventsRespository } from '../repositories/blueprint.events.repo'
import { BaseController } from './base.controller'
import { JsonController, Res, Get, Param, Post, Body } from 'routing-controllers'
import { Constants } from '../common/constants'
import { Service } from 'typedi'

@Service()
@JsonController(Constants.V3)
export class BlueprintEventsController extends BaseController {
    constructor(private blueprintEventsRespository: BlueprintEventsRespository) {
        super()
    }

    @Get('/create-blueprint-events')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.blueprintEventsRespository.getAll(), response)
    }

    @Get('/create-blueprint-events/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.blueprintEventsRespository.findById(id), response)
    }

    @Post('/create-blueprint-events')
    async createApplicationA(@Body() body: any, @Res() response: Response) {
        const result = await this.blueprintEventsRespository.createBlueprintEvents(body)
        return this.successResponse(result, response)
    }
}
