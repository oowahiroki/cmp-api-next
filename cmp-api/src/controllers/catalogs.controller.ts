import { Response } from 'express'
import { CatalogRespository } from '../repositories/catalogs.repo'
import { BaseController } from './base.controller'
import { JsonController, Res, Get, Param, Post, Body, Put, Delete } from 'routing-controllers'
import { Constants } from '../common/constants'
import { Service } from 'typedi'
import { Catalog, CatalogPart } from '../model/catalogs'
import { isObjectNotEmpty, isArrayNotEmpty } from '../common/common'
import { PartsRespository } from '../repositories/parts.repo'
import { ObjectId } from 'mongodb'
export interface CreateCatalog {
    tenantID: string
    name: string
    description: string
    partsList?: PartList[]
}
export interface Attach {
    catalogID?: string
    templatePartsID: string
    targetPartsID?: string
    partsList?: PartList[]
}
interface PartList {
    id?: ObjectId
    name: string
    description: string
    partsTypeID: string
    partsTypeName: string
    targetPartsID?: string
    value?: Value[]
    customValue?: CustomValue[]
}

interface Value {
    id: string
    delegate: boolean
    value: string
}

interface CustomValue {
    id: string
    delegate: boolean
    value: string
    masterID: string
}

@Service()
@JsonController(Constants.V2)
export class CatalogController extends BaseController {
    constructor(private catalogRespository: CatalogRespository, private partsRespository: PartsRespository) {
        super()
    }

    @Get('/catalogs')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.catalogRespository.getAll(), response)
    }

    @Get('/catalogs/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.catalogRespository.findById(id), response)
    }

    @Post('/catalogs')
    async createCatalog(@Body() body: CreateCatalog, @Res() response: Response) {
        const input: Catalog = {
            tenantID: body.tenantID,
            name: body.name,
            description: body.description,
            partsList: []
        }
        const result = await this.catalogRespository.createCatalog(input)
        return this.successResponse(result.ops, response)
    }

    @Put('/catalogs/:id')
    async updateCatalog(@Param('id') id: string, @Body() body: CreateCatalog, @Res() response: Response) {
        const input: Catalog = {
            tenantID: body.tenantID,
            name: body.name,
            description: body.description
        }
        const result = await this.catalogRespository.updateCatalog(id, input)
        return this.successResponse(result, response)
    }

    @Delete('/catalogs/:id')
    async deleteCatalogByID(@Param('id') id: string, @Res() response: Response) {
        const result = await this.catalogRespository.deleteCatalog(id)
        return this.successResponse(result, response)
    }

    @Post('/catalogs/:id/part')
    async attachCatalogPart(@Param('id') id: string, @Body() body: Attach, @Res() response: Response) {
        const input: CatalogPart = this.convertRequestToInput(body)
        const PartList = await this.catalogRespository.findById(id)
        input.catalogID = id
        input.partsList = PartList['partsList']
        const catalogPart = [await this.partsRespository.findById(body.templatePartsID)]
        if (isObjectNotEmpty(catalogPart)) {
            catalogPart.forEach(element => {
                input.partsList.push({
                    id: new ObjectId(),
                    name: element['name'],
                    description: element['description'],
                    partsTypeID: element['partsTypeID'],
                    partsTypeName: element['partsTypeName'],
                    value: element['value'],
                    customValue: element['customValue'],
                    targetPartsID: body.targetPartsID
                })
            })
        }
        const result = await this.catalogRespository.atachCatalog(id, input)
        return this.successResponse(result, response)
    }
    @Delete('/catalogs/:catalogId/parts/:partId')
    async detachCatalogPart(
        @Param('catalogId') catalogId: string,
        @Param('partId') partId: string,
        @Res() response: Response
    ) {
        const result = await this.catalogRespository.detachCatalog(catalogId, partId)
        return this.successResponse(result, response)
    }
    private convertRequestToInput(body: Attach): CatalogPart {
        return {
            catalogID: body.catalogID,
            partsList: body.partsList
        }
    }
}
