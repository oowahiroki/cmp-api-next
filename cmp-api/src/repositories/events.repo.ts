import { BaseRepository } from './base.repo'
import { Service } from 'typedi'

/**
 * EventsRespository
 * @author HoaiNT
 */

@Service()
export class EventsRespository extends BaseRepository {
    constructor() {
        super('events')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
}
