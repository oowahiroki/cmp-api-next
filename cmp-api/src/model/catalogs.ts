import { BaseModel } from './base'
import { ObjectId } from 'mongodb'

export interface Catalog extends BaseModel {
    tenantID?: string
    name: string
    description: string
    partsList?: PartsList[]
}
export interface CatalogPart extends BaseModel {
    catalogID?: string
    templatePartsID?: string
    targetPartsID?: string
    partsList?: PartsList[]
}
export interface PartsList {
    id?: ObjectId
    name: string
    description: string
    partsTypeID: string
    partsTypeName: string
    value?: Value[]
    customValue?: CustomValue[]
    targetPartsID?: string
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
