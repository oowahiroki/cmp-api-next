import { BaseRepository } from './base.repo'
import { Parts } from '../model/parts'
/**
 * PartsRespository
 * @author ThanhPham
 */
export class PartsRespository extends BaseRepository {
    constructor() {
        super('parts')
    }

    public async getAll() {
        return await this.find({})
    }

    public async addParts(input: Parts) {
        return await this.create(input)
    }

    public async updateParts(id: string, input: Parts) {
        return await this.update(this.buildFilterById(id), input)
    }

    public async deleteParts(id: string) {
        return await this.deleteLogic(this.buildFilterById(id))
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
