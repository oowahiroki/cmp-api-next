import { Response } from 'express'
import { CopesRespository } from '../repositories/copes.repo'
import { Service } from 'typedi'
import { JsonController, Get, Res, Param, Post, Body } from 'routing-controllers'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'

interface CopesRequest {
    id?: string
}

@Service()
@JsonController(Constants.V3)
export class CopesController extends BaseController {
    constructor(private repository: CopesRespository) {
        super()
    }

    @Get('/copes')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.repository.getAll(), response)
    }

    @Get('/copes/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.repository.findById(id), response)
    }

    @Post('/copes')
    async createApplicationA(@Body() body: CopesRequest, @Res() response: Response) {
        return this.successResponse(body, response)
    }
}
