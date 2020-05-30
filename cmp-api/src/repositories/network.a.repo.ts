import { BaseRepository } from './base.repo'
import { Service } from 'typedi'

/**
 * NetworkARespository
 * @author HoaiNT
 */

@Service()
export class NetworkARespository extends BaseRepository {
    constructor() {
        super('networks-a')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
