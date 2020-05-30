import { Response } from 'express'
import { Service } from 'typedi'
import { NetworkARespository } from '../repositories/network.a.repo'
import { JsonController, Get, Res, Param, Post, Body } from 'routing-controllers'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'

interface NetworksARequest {
    id?: string
}

@Service()
@JsonController(Constants.V3)
export class NetworksAController extends BaseController {
    constructor(private repository: NetworkARespository) {
        super()
    }

    @Get('/networks-a')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.repository.getAll(), response)
    }

    @Get('/networks-a/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.repository.findById(id), response)
    }

    @Post('/networks-a')
    async createApplicationA(@Body() body: NetworksARequest, @Res() response: Response) {
        return this.successResponse(body, response)
    }
}
