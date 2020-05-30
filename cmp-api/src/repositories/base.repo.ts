import * as mongo from 'mongodb'
import { MongoHelper } from '../configuration/mongo.helper'
import { BaseQuery, BaseModel } from '../model/base'

const notEqual = { $ne: 1 }

export class BaseRepository {
    protected _collection: mongo.Collection<object>

    constructor(collectionName: string) {
        this._collection = MongoHelper.getCollection(collectionName)
    }

    /**
     * This function is used to create filter with ObjectID
     * @param id
     */
    protected buildFilterById(id: string) {
        return { _id: new mongo.ObjectID(id) }
    }

    /**
     * This function is used to call aggregate function.
     * @param pipeline
     */
    protected async aggregate(pipeline: object[]): Promise<mongo.AggregationCursor<object>> {
        return this._collection.aggregate(pipeline)
    }

    /**
     * This function is used to find multiple documents.
     * @param query
     * @param options
     */
    protected async find(query: mongo.FilterQuery<BaseQuery>, options?: mongo.FindOneOptions): Promise<object[]> {
        query.deleteFlag = notEqual
        return this._collection.find(query, options).toArray()
    }

    /**
     * This function is used to find single document.
     * @param query
     * @param options
     */
    protected async findOne(query: mongo.FilterQuery<BaseQuery>, options?: mongo.FindOneOptions): Promise<object> {
        query.deleteFlag = notEqual
        return this._collection.findOne(query, options)
    }

    /**
     * This function is used to insert one document.
     * @param input
     * @param options
     */
    protected async create(input: BaseModel, options?: mongo.CollectionInsertOneOptions) {
        input.createdAt = new Date().getTime()
        return this._collection.insertOne(input, options)
    }

    /**
     * This function is used to update one document.
     * @param filter
     * @param update
     */
    protected async update(filter: mongo.FilterQuery<BaseModel>, update: BaseModel) {
        update.updatedAt = new Date().getTime()
        const updateQuery = { $set: update }
        return this._collection.updateOne(filter, updateQuery)
    }

    /**
     * This function is used to delete logic.
     * @param filter
     */
    protected async deleteLogic(filter: mongo.FilterQuery<BaseModel>) {
        const input: BaseModel = {
            deleteFlag: 1,
            deletedAt: new Date().getTime()
        }
        const updateQuery = { $set: input }
        return this._collection.updateOne(filter, updateQuery)
    }
}
