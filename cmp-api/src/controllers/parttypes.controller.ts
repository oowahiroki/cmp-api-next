import { Response } from 'express'
import { PartTypesRespository } from '../repositories/part.types.repo'
import { BaseController } from './base.controller'
import { JsonController, Res, Get, Param, Post, Body, Delete, Put } from 'routing-controllers'
import { Constants } from '../common/constants'
import { Service } from 'typedi'
import { PartTypes } from '../model/part.types.model'
export interface PartTypesRequest {
    name: string
    description: string
}
@Service()
@JsonController(Constants.V2)
export class PartTypesController extends BaseController {
    constructor(private partTypesRespository: PartTypesRespository) {
        super()
    }

    @Get('/part-types')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.partTypesRespository.getAll(), response)
    }

    @Get('/part-types/:id')
    async getOnePartTypes(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.partTypesRespository.findById(id), response)
    }

    @Post('/part-types')
    async createPartTypes(@Body() body: PartTypesRequest, @Res() response: Response) {
        const input: PartTypes = {
            name: body.name,
            description: body.description
        }
        const result = await this.partTypesRespository.addPartTypes(input)
        return this.successResponse(result.ops, response)
    }

    @Delete('/part-types/:id')
    async deletePartTypes(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.partTypesRespository.deletePartTypes(id), response)
    }

    @Put('/part-types/:id')
    async updatePartTypes(@Param('id') id: string, @Body() body: PartTypesRequest, @Res() response: Response) {
        const input: PartTypes = {
            name: body.name,
            description: body.description
        }
        const result = await this.partTypesRespository.updatePartTypes(id, input)
        return this.successResponse(result, response)
    }
}