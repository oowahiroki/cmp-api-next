import { Service } from 'typedi'
import { BaseRepository } from './base.repo'
import { MasterItem } from '../model/master.items'
/**
 * MasterItemRespository
 * @author HoaiNT
 */
@Service()
export class MasterItemRespository extends BaseRepository {
    constructor() {
        super('master-items')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }

    public async createMasterItem(input: MasterItem) {
        return await this.create(input)
    }

    public async updateMasterItem(id: string, input: MasterItem) {
        return await this.update(this.buildFilterById(id), input)
    }

    public async deleteMasterItem(id: string) {
        return await this.deleteLogic(this.buildFilterById(id))
    }
}
