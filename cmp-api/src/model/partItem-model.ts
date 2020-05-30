import database from '../configuration/database'
import { PartItem } from '../interface/interface'
import { getPartTypesById } from '../model/parttypes-model'
const collection = 'partItem'
function buildProjection() {
    const projection = { password: 0 }
    return projection
}
export const partItemModel = {
    async getAll() {
        const filter = {}
        // declare fields that needs to retrieve instead of get all of fields
        const options = database.createFindOptions({ projection: buildProjection() })
        return await database.find(collection, filter, options)
    },
    async addPartItem(input: PartItem) {
        if (input.partTypeID !== undefined) {
            const partType = await Promise.all([getPartTypesById(input.partTypeID)])
            if (partType[0] == null) {
                return null
            }
            input.partType = {
                id: input.partTypeID,
                name: partType[0].name
            }
        }
        const result = await database.insertOne(collection, input)
        return result.ops
    },
    async findById(id: string) {
        const filter = database.buildFilterById(id)
        const options = database.createFindOptions({ projection: buildProjection() })
        return await database.findOne(collection, filter, options)
    },
    async Update(id: string, input: PartItem) {
        const filter = database.buildFilterById(id)
        const result = await database.updateOne(collection, filter, input)
        return result.modifiedCount
    },
    async deleteByID(id: string) {
        const filter = database.buildFilterById(id)
        const result = await database.deleteLogic(collection, filter)
        return result.modifiedCount
    }
}
