import { BaseRepository } from './base.repo'
import { BlueprintEvents } from '../model/blueprint.events'
import { Service } from 'typedi'

/**
 * BlueprintEventsRespository
 * @author HoaiNT
 */
@Service()
export class BlueprintEventsRespository extends BaseRepository {
    constructor() {
        super('create-blueprint-events')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }

    public async createBlueprintEvents(input: BlueprintEvents) {
        return await this.create(input)
    }
}
