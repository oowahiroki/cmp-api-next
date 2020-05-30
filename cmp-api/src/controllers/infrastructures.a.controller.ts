import { Response } from 'express'
import { InfrastructuresARespository } from '../repositories/infrastructures.a.repo'
import { Service } from 'typedi'
import { JsonController, Get, Res, Param, Post, Body } from 'routing-controllers'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'

interface InfrastructuresARequest {
    id?: string
}

@Service()
@JsonController(Constants.V3)
export class InfrastructuresAController extends BaseController {
    constructor(private repository: InfrastructuresARespository) {
        super()
    }

    @Get('/infrastructures-a')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.repository.getAll(), response)
    }

    @Get('/infrastructures-a/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.repository.findById(id), response)
    }

    @Post('/infrastructures-a')
    async createApplicationA(@Body() body: InfrastructuresARequest, @Res() response: Response) {
        return this.successResponse(body, response)
    }
}
