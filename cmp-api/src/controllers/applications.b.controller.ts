import { Response } from 'express'
import { ApplicationsBRespository } from '../repositories/applications.b.repo'
import { Service } from 'typedi'
import { JsonController, Get, Res, Param, Post, Body } from 'routing-controllers'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'

interface ApplicationBRequest {
    id?: string
}

@Service()
@JsonController(Constants.V3)
export class ApplicationsBController extends BaseController {
    constructor(private repository: ApplicationsBRespository) {
        super()
    }

    @Get('/applications-b')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.repository.getAll(), response)
    }

    @Get('/applications-b/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.repository.findById(id), response)
    }

    @Post('/applications-b')
    async createApplicationB(@Body() body: ApplicationBRequest, @Res() response: Response) {
        return this.successResponse(body, response)
    }
}
