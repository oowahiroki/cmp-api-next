import { BaseRepository } from './base.repo'
import { Service } from 'typedi'

/**
 * NetworkBRespository
 * @author HoaiNT
 */

@Service()
export class NetworkBRespository extends BaseRepository {
    constructor() {
        super('networks-b')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
