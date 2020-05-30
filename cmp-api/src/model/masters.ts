import { BaseModel } from './base'
export interface Masters extends BaseModel {
    name: string
    partsItemID: string
    description: string
    tenantID?: string
    masterItem?: MasterItem[]
    value?: Value[]
}
export interface MasterItem {
    id: string
    value: string
    description: string
    inputType: string
    infrastructureType: string
    name: string
}
export interface Value {
    id: string
    value: string
}
