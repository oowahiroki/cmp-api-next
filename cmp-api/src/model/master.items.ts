import { BaseModel } from './base'

export interface MasterItem extends BaseModel {
    masterItems: MasterItemObject
}

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
