import { BaseRepository } from './base.repo'
import { OperationEvents } from '../model/operation.events'
/**
 * OperationEventsRespository
 * @author HoaiNT
 */
export class OperationEventsRespository extends BaseRepository {
    constructor() {
        super('operation-events')
    }

    public async getAll() {
        return await this.find({})
    }

    public async addOperationEvents(input: OperationEvents) {
        return await this.create(input)
    }

    public async updateOperationEvents(id: string, input: OperationEvents) {
        return await this.update(this.buildFilterById(id), input)
    }

    public async deleteOperationEvents(id: string) {
        return await this.deleteLogic(this.buildFilterById(id))
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
