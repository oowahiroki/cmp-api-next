import { BaseModel } from './base'

export interface BlueprintEvents extends BaseModel {
    tenantID: string
    blueprintName: string
    description: string
    autoBlueprintExecFlag: boolean
    status: string
    serviceType?: string
    availability?: string
    performance?: string
    area?: string
}
