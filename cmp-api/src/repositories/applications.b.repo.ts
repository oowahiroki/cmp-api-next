import { BaseRepository } from './base.repo'
import { Service } from 'typedi'

/**
 * ApplicationsBRespository
 * @author HoaiNT
 */
@Service()
export class ApplicationsBRespository extends BaseRepository {
    constructor() {
        super('applications-b')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
