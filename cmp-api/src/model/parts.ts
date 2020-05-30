import { BaseModel } from './base'

export interface Value {
    id: string
    delegate: boolean
    value: string
}

export interface CustomValue {
    id: string
    delegate: boolean
    value: string
    masterID: string
}

export interface Parts extends BaseModel {
    tenantID?: string
    name: string
    description: string
    partsTypeID?: string
    partsTypeName?: string
    value?: Value[]
    customValue?: CustomValue[]
}
