import { BaseRepository } from './base.repo'
/**
 * BlueprintEventsRespository
 * @author HoaiNT
 */
export class BusinessRequirementsRespository extends BaseRepository {
    constructor() {
        super('businessRequirements')
    }

    public async getAll() {
        return await this.find({})
    }
    public async getByID(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }
    public async businessRequirements(input: object) {
        return await this.create(input)
    }
}
