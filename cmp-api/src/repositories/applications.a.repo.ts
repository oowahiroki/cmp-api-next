import { Service } from 'typedi'
import { BaseRepository } from './base.repo'

/**
 * ApplicationsARespository
 * @author HoaiNT
 */
@Service()
export class ApplicationsARespository extends BaseRepository {
    constructor() {
        super('applications-a')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }

    public async findComplex() {
        const pipeline = [{ $match: {} }]
        const result = await this.aggregate(pipeline)
        // result.
        console.log('result', result)
        return {}
    }
}
