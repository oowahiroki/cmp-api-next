import { Response } from 'express'
import { Get, JsonController, Res, Post, Body, Param, Put, Delete } from 'routing-controllers'
import { Service } from 'typedi'
import { MastersRespository } from '../repositories/masters.repo'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'
import { Masters } from '../model/masters'

interface MasterItem {
    id: string
    value: string
    description: string
    inputType: string
    infrastructureType: string
    name: string
}

interface Value {
    id: string
    value: string
}

export interface CreateMastersRequest {
    tenantID: string
    partsItemID: string
    name: string
    description: string
    masterItem: MasterItem[]
}
export interface UpdateMastersRequest {
    partsItemID: string
    name: string
    description: string
    value: Value[]
}
@Service()
@JsonController(Constants.V2)
export class MastersAController extends BaseController {
    constructor(private mastersRespository: MastersRespository) {
        super()
    }

    @Get('/masters')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.mastersRespository.getAll(), response)
    }

    @Post('/masters')
    async createMasters(@Body() body: CreateMastersRequest, @Res() response: Response) {
        const input: Masters = {
            tenantID: body.tenantID,
            name: body.name,
            partsItemID: body.partsItemID,
            description: body.description,
            masterItem: body.masterItem
        }
        return this.successResponse((await this.mastersRespository.addMasters(input)).ops, response)
    }

    @Get('/masters/:id')
    async getOne(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.mastersRespository.findById(id), response)
    }

    @Put('/masters/:id')
    async updateMasters(@Param('id') id: string, @Body() body: UpdateMastersRequest, @Res() response: Response) {
        const input: Masters = {
            name: body.name,
            partsItemID: body.partsItemID,
            description: body.description,
            value: body.value
        }
        return this.successResponse(await this.mastersRespository.updateMasters(id, input), response)
    }

    @Delete('/masters/:id')
    async deleteMasters(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.mastersRespository.deleteMasters(id), response)
    }
}
