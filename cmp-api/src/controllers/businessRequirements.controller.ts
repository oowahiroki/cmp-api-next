/* eslint-disable @typescript-eslint/class-name-casing */
import { Request, Response } from 'express'
import { common } from '../common/common'
import { BusinessRequirementsRespository } from '../repositories/businessRequirements.repo'

export const BusinessRequirementsController = {
    async getAll(req: Request, res: Response) {
        const result = await new BusinessRequirementsRespository().getAll()
        common.findDataResponse(result, res)
    },
    async getByID(req: Request, res: Response) {
        const result = await new BusinessRequirementsRespository().getByID(req.params.id)
        common.findDataResponse(result, res)
    }
}
