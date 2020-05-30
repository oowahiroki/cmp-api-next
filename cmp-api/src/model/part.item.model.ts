import { BaseModel } from './base'

export interface PartItem extends BaseModel {
    no: string
    name: string
    description: string
    inputType: string
    value: string
    valueType: string
    partTypeID?: string
    partType?: {
        id: string
        name: string
    }
}
