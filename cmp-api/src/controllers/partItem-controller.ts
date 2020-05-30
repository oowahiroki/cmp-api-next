import { Request, Response } from 'express'
import { common } from '../common/common'
import { partItemModel } from '../model/partItem-model'
export const partItemController = {
    async getAll(req: Request, res: Response) {
        const result = await partItemModel.getAll()
        common.findDataResponse(result, res)
    },
    async addPartItem(req: Request, res: Response) {
        const result = await partItemModel.addPartItem(req.body)
        common.addStateResponse(result, res)
    },
    async findByID(req: Request, res: Response) {
        const result = await partItemModel.findById(req.params.id)
        common.findDataResponse(result, res)
    },
    async DeleteById(req: Request, res: Response) {
        const result = await partItemModel.deleteByID(req.params.id)
        common.modifyStateResponse(result, res)
    },
    async Update(req: Request, res: Response) {
        const result = await partItemModel.Update(req.params.id, req.body)
        common.modifyStateResponse(result, res)
    }
}
