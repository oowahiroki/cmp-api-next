import { Response } from 'express'
import { NetworkBRespository } from '../repositories/network.b.repo'
import { Service } from 'typedi'
import { JsonController, Get, Res, Param, Post, Body } from 'routing-controllers'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'

interface NetworksBRequest {
    id?: string
}

@Service()
@JsonController(Constants.V3)
export class NetworksBController extends BaseController {
    constructor(private repository: NetworkBRespository) {
        super()
    }

    @Get('/networks-b')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.repository.getAll(), response)
    }

    @Get('/networks-b/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.repository.findById(id), response)
    }

    @Post('/networks-b')
    async createApplicationA(@Body() body: NetworksBRequest, @Res() response: Response) {
        return this.successResponse(body, response)
    }
}
