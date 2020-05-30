import { BaseRepository } from './base.repo'
import { PartItem } from '../model/part.item.model'
import { Service } from 'typedi'

/**
 * PartItemRespository
 * @author HoaiNT
 */
@Service()
export class PartItemRespository extends BaseRepository {
    constructor() {
        super('part-item')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }

    public async createPartItem(input: PartItem) {
        return await this.create(input)
    }

    public async updatePartItem(id: string, input: PartItem) {
        return await this.update(this.buildFilterById(id), input)
    }

    public async deletePartItem(id: string) {
        return await this.deleteLogic(this.buildFilterById(id))
    }
}
