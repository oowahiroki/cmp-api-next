import { BaseRepository } from './base.repo'
import { Service } from 'typedi'

/**
 * InfrastructuresARespository
 * @author HoaiNT
 */
@Service()
export class InfrastructuresARespository extends BaseRepository {
    constructor() {
        super('infrastructures-a')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
