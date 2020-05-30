import { BaseModel } from './base'
export interface OperationEvents extends BaseModel {
    tenantID?: string
    target: string
    message: string
    timeOfOccurrence: Date
    causesEffects?: string
    actionName?: string
    status?: string
}
