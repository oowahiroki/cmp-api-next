import { Response } from 'express'
import { InfrastructuresBRespository } from '../repositories/infrastructures.b.repo'
import { Service } from 'typedi'
import { JsonController, Get, Res, Param, Post, Body } from 'routing-controllers'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'

interface InfrastructuresBRequest {
    id?: string
}

@Service()
@JsonController(Constants.V3)
export class InfrastructuresBController extends BaseController {
    constructor(private repository: InfrastructuresBRespository) {
        super()
    }

    @Get('/infrastructures-b')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.repository.getAll(), response)
    }

    @Get('/infrastructures-b/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.repository.findById(id), response)
    }

    @Post('/infrastructures-b')
    async createApplicationA(@Body() body: InfrastructuresBRequest, @Res() response: Response) {
        return this.successResponse(body, response)
    }
}
