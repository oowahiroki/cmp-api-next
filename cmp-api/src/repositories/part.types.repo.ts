import { BaseRepository } from './base.repo'
import { PartTypes } from '../model/part.types.model'
/**
 * PartTypesRespository
 * @author HoaiNT
 */
export class PartTypesRespository extends BaseRepository {
    constructor() {
        super('part-types')
    }

    public async getAll() {
        return await this.find({})
    }

    public async addPartTypes(input: PartTypes) {
        return await this.create(input)
    }

    public async updatePartTypes(id: string, input: PartTypes) {
        return await this.update(this.buildFilterById(id), input)
    }

    public async deletePartTypes(id: string) {
        return await this.deleteLogic(this.buildFilterById(id))
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
