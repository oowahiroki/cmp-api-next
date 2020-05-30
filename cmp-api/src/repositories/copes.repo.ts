import { BaseRepository } from './base.repo'
import { Service } from 'typedi'

/**
 * CopesRespository
 * @author HoaiNT
 */

@Service()
export class CopesRespository extends BaseRepository {
    constructor() {
        super('copes')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
