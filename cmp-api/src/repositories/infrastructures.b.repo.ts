import { BaseRepository } from './base.repo'
import { Service } from 'typedi'

/**
 * InfrastructuresBRespository
 * @author HoaiNT
 */

@Service()
export class InfrastructuresBRespository extends BaseRepository {
    constructor() {
        super('infrastructures-b')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
