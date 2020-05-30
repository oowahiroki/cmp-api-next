import { BaseModel } from './base'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BusinessRequirements extends BaseModel {
    basicEventID: string
    serviceType: string
    availability: string
    performance: string
    area: string
    scale: string
}
