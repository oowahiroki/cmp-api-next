import { Response } from 'express'
import { OperationEventsRespository } from '../repositories/operation.events.repo'
import { BaseController } from './base.controller'
import { JsonController, Res, Get, Param, Post, Body, Delete, Put } from 'routing-controllers'
import { Constants } from '../common/constants'
import { Service } from 'typedi'
import { OperationEvents } from '../model/operation.events'

export interface AddOperationEventsRequest {
    tenantID?: string
    target: string
    message: string
    timeOfOccurrence: Date
}
export interface UpdateOperationEventsRequest extends AddOperationEventsRequest {
    causesEffects?: string
    actionName?: string
    status?: string
}
@Service()
@JsonController(Constants.V3)
export class OperationEventsController extends BaseController {
    constructor(private operationEventsRespository: OperationEventsRespository) {
        super()
    }

    @Get('/operation-events')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.operationEventsRespository.getAll(), response)
    }

    @Get('/operation-events/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.operationEventsRespository.findById(id), response)
    }

    @Post('/operation-events')
    async addOperationEvents(@Body() body: AddOperationEventsRequest, @Res() response: Response) {
        const input: OperationEvents = {
            tenantID: body.tenantID,
            target: body.target,
            message: body.message,
            timeOfOccurrence: new Date(body.timeOfOccurrence)
        }
        const result = await this.operationEventsRespository.addOperationEvents(input)
        return this.successResponse(result.ops, response)
    }

    @Delete('/operation-events/:id')
    async deleteOperationEvents(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.operationEventsRespository.deleteOperationEvents(id), response)
    }

    @Put('/operation-events/:id')
    async updateOperationEvents(
        @Param('id') id: string,
        @Body() body: UpdateOperationEventsRequest,
        @Res() response: Response
    ) {
        const input: OperationEvents = {
            target: body.target,
            message: body.message,
            timeOfOccurrence: new Date(body.timeOfOccurrence),
            causesEffects: body.causesEffects,
            actionName: body.actionName,
            status: body.status
        }
        return this.successResponse(await this.operationEventsRespository.updateOperationEvents(id, input), response)
    }
}
