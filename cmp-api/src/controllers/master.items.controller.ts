import { Response } from 'express'
import { MasterItemRespository } from '../repositories/master.items.repo'
import { BaseController } from './base.controller'
import { JsonController, Res, Get, Param, Post, Body, Put, Delete } from 'routing-controllers'
import { Constants } from '../common/constants'
import { Service } from 'typedi'
import { MasterItem } from '../model/master.items'
interface Value {
    id: string
    name: string
    description: string
    inputType: string
    infrastructureType: string
}
interface MasterItemObject {
    masterItems: Value
}
export interface CreateMasterItem {
    masterItems: MasterItemObject
}

@Service()
@JsonController(Constants.V2)
export class MasterItemsController extends BaseController {
    constructor(private masterItemRespository: MasterItemRespository) {
        super()
    }

    @Get('/masters-items')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.masterItemRespository.getAll(), response)
    }

    @Get('/masters-items/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.masterItemRespository.findById(id), response)
    }

    @Post('/masters-items')
    async createMastersItem(@Body() body: CreateMasterItem, @Res() response: Response) {
        const input: MasterItem = {
            masterItems: body.masterItems
        }
        const result = await this.masterItemRespository.createMasterItem(input)
        return this.successResponse(result.ops, response)
    }
    @Put('/masters-items/:id')
    async updateMastersItem(@Param('id') id: string, @Body() body: CreateMasterItem, @Res() response: Response) {
        const input: MasterItem = {
            masterItems: body.masterItems
        }
        const result = await this.masterItemRespository.updateMasterItem(id, input)
        return this.successResponse(result, response)
    }

    @Delete('/masters-items/:id')
    async deleteMastersItemByID(@Param('id') id: string, @Res() response: Response) {
        const result = await this.masterItemRespository.deleteMasterItem(id)
        return this.successResponse(result, response)
    }
}
