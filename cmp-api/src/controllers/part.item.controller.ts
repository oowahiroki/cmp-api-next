import { Response } from 'express'
import { PartItemRespository } from '../repositories/part.item.repo'
import { BaseController } from './base.controller'
import { JsonController, Res, Get, Param, Post, Body, Put, Delete } from 'routing-controllers'
import { Constants } from '../common/constants'
import { Service } from 'typedi'
import { PartTypesRespository } from '../repositories/part.types.repo'
import { isObjectNotEmpty, isStringNotEmpty } from '../common/common'
import { PartTypes } from '../model/part.types.model'
import { PartItem } from '../model/part.item.model'

interface PartItemRequest {
    no: string
    name: string
    description: string
    inputType: string
    value: string
    valueType: string
    partTypeID: string
    partType: object
}

@Service()
@JsonController(Constants.V2)
export class PartItemController extends BaseController {
    constructor(private partItemRespository: PartItemRespository, private partTypesRespository: PartTypesRespository) {
        super()
    }

    @Get('/part-item')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.partItemRespository.getAll(), response)
    }

    @Get('/part-item/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.partItemRespository.findById(id), response)
    }

    @Post('/part-item')
    async createPartItem(@Body() body: PartItemRequest, @Res() response: Response) {
        const input: PartItem = this.convertRequestToInput(body)
        if (isStringNotEmpty(body.partTypeID)) {
            const partType = (await this.partTypesRespository.findById(body.partTypeID)) as PartTypes
            if (isObjectNotEmpty(partType)) {
                body.partType = {
                    id: body.partTypeID,
                    name: partType.name
                }
            }
        }
        const result = await this.partItemRespository.createPartItem(input)
        return this.successResponse(result.ops, response)
    }

    @Put('/part-item/:id')
    async updatePartItem(@Param('id') id: string, @Body() body: PartItemRequest, @Res() response: Response) {
        const input: PartItem = this.convertRequestToInput(body)
        const result = await this.partItemRespository.updatePartItem(id, input)
        return this.successResponse(result, response)
    }

    @Delete('/part-item/:id')
    async deletePartItemByID(@Param('id') id: string, @Res() response: Response) {
        const result = await this.partItemRespository.deletePartItem(id)
        return this.successResponse(result, response)
    }

    private convertRequestToInput(body: PartItemRequest): PartItem {
        return {
            description: body.description,
            inputType: body.inputType,
            name: body.name,
            no: body.no,
            value: body.value,
            valueType: body.valueType
        }
    }
}
