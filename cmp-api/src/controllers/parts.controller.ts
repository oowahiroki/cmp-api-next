import { Response } from 'express'
import { BaseController } from './base.controller'
import { JsonController, Res, Get, Param, Post, Body, Put, Delete } from 'routing-controllers'
import { Constants } from '../common/constants'
import { Service } from 'typedi'
import { PartsRespository } from '../repositories/parts.repo'
import { Parts } from '../model/parts'

interface Value {
    id: string
    delegate: boolean
    value: string
}

export interface PartsRequest {
    tenantID?: string
    name: string
    description: string
    partsTypeID?: string
    partsTypeName?: string
    value?: Value[]
}
@Service()
@JsonController(Constants.V2)
export class PartsController extends BaseController {
    constructor(private partsRespository: PartsRespository) {
        super()
    }

    @Get('/parts')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.partsRespository.getAll(), response)
    }

    @Post('/parts')
    async createPartTypes(@Body() body: PartsRequest, @Res() response: Response) {
        const input: Parts = {
            tenantID: body.tenantID,
            name: body.name,
            partsTypeID: body.partsTypeID,
            partsTypeName: body.partsTypeName,
            description: body.description,
            value: body.value
        }
        const result = await this.partsRespository.addParts(input)
        return this.successResponse(result.ops, response)
    }

    @Get('/parts/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.partsRespository.findById(id), response)
    }

    @Put('/parts/:id')
    async updateParts(@Param('id') id: string, @Body() body: PartsRequest, @Res() response: Response) {
        const input: Parts = {
            tenantID: body.tenantID,
            name: body.name,
            partsTypeID: body.partsTypeID,
            partsTypeName: body.partsTypeName,
            description: body.description,
            value: body.value
        }
        const result = await this.partsRespository.updateParts(id, input)
        return this.successResponse(result, response)
    }

    @Delete('/parts/:id')
    async deleteParts(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.partsRespository.deleteParts(id), response)
    }
}
