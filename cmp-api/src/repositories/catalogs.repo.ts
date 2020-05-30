import { Service } from 'typedi'
import { BaseRepository } from './base.repo'
import { Catalog, CatalogPart } from '../model/catalogs'
import { ObjectId } from 'mongodb'
/**
 * CatalogRespository
 * @author HoaiNT
 */
@Service()
export class CatalogRespository extends BaseRepository {
    constructor() {
        super('catalogs')
    }

    public async getAll() {
        return await this.find({})
    }

    public async findById(id: string) {
        return await this.findOne(this.buildFilterById(id))
    }

    public async createCatalog(input: Catalog) {
        return await this.create(input)
    }

    public async updateCatalog(id: string, input: Catalog) {
        return await this.update(this.buildFilterById(id), input)
    }

    public async atachCatalog(id: string, input: CatalogPart) {
        return await this.update(this.buildFilterById(id), input)
    }

    public async deleteCatalog(id: string) {
        return await this.deleteLogic(this.buildFilterById(id))
    }

    public async detachCatalog(id: string, partsListId: string) {
        const updateQuery = {
            $set: { updatedAt: new Date().getTime() },
            $pull: { partsList: { id: new ObjectId(partsListId) } }
        }
        return await this._collection.updateOne(this.buildFilterById(id), updateQuery)
    }
}
