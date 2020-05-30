import { BaseRepository } from './base.repo'
import { Masters } from '../model/masters'
/**
 * OperationEventsRespository
 * @author HoaiNT
 */
export class MastersRespository extends BaseRepository {
    constructor() {
        super('masters')
    }

    public async getAll() {
        return await this.find({})
    }

    public async addMasters(input: Masters) {
        return await this.create(input)
    }

    public async updateMasters(id: string, input: Masters) {
        return await this.update(this.buildFilterById(id), input)
    }

    public async deleteMasters(id: string) {
        return await this.deleteLogic(this.buildFilterById(id))
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
