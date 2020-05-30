import { MongoClient } from 'mongodb'
const Db = require('mongodb').Db
const Logger = require('mongodb').Logger
import assert from 'assert'
import { Constants } from '../common/constants'
import { ObjectId } from 'mongodb'

// Must change IP to server
const mongodbURI = 'mongodb://localhost:27017'

const mongoDatabase = 'cmp-dev'

const buildUpdateFromInput = (input: any) => {
    const update = {}
    if (input) {
        input[Constants.Collections.Common.UpdateTime] = new Date().getTime()
        update[Constants.DbKeywords.Set] = input
    }
    return update
}

const database = {
    db: Db,
    // db: new Db(), /** This line is used to figure out information of Mongo Driver. Just used for local development */
    initDatabase: async () => {
        const client = new MongoClient(mongodbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        client.connect(function(err: any) {
            assert.equal(null, err)
            // Set debug level
            Logger.setLevel('debug')
            Logger.filter('class', ['Db', 'Cursor'])
            // Set our own logge
            Logger.setCurrentLogger(function(msg: any) {
                console.log(msg)
            })
            database.db = client.db(mongoDatabase)
            database.db.command({ ismaster: false }, function(err: any) {
                assert.equal(null, err)
            })
        })
    },
    /** This function is used to find multiple documents. */
    find: async (collectionName: string, filter: any, options: any) => {
        const notEqual = {}
        notEqual[Constants.DbKeywords.NotEqual] = Constants.Deleted
        filter[Constants.Collections.Common.DeleteFlag] = notEqual
        return await database.db
            .collection(collectionName)
            .find(filter, options)
            .toArray()
    },
    /** This function is used to find one document. */
    findOne: async (collectionName: string, filter: any, projection?: any) => {
        return await database.db.collection(collectionName).findOne(filter, projection)
    },
    /** This function is used to insert one document. */
    insertOne: async (collectionName: string, data: any) => {
        data[Constants.Collections.Common.InsertTime] = new Date().getTime()
        return await database.db.collection(collectionName).insertOne(data)
    },
    /** This function is used to insert multiple documents. */
    insertMany: async (collectionName: string, data: any) => {
        data[Constants.Collections.Common.InsertTime] = new Date().getTime()
        return await database.db.collection(collectionName).insertMany(data)
    },
    /** This function is used to update one document. */
    updateOne: async (collectionName: string, filter: any, input: any) => {
        const update = buildUpdateFromInput(input)
        return await database.db.collection(collectionName).updateOne(filter, update)
    },
    /** This function is used to update multiple documents. */
    updateMany: async (collectionName: string, filter: any, input: any) => {
        return await database.db.collection(collectionName).updateMany(filter, input)
    },
    /** This function is used to delete logic. */
    deleteLogic: async (collectionName: string, filter: any) => {
        const input = {}
        input[Constants.Collections.Common.DeleteFlag] = 1
        input[Constants.Collections.Common.DeleteTime] = new Date().getTime()
        const update = buildUpdateFromInput(input)
        return await database.db.collection(collectionName).updateOne(filter, update)
    },
    // see http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#findOne
    createFindOptions: ({ skip = null, limit = null, projection = null, sort = null }) => {
        const options = {}
        options['skip'] = skip ? skip : null
        options['limit'] = limit ? limit : null
        options['projection'] = projection ? projection : null
        options['sort'] = sort ? sort : null
        return options
    },
    buildFilterById: (id: string) => {
        const filter = {}
        const notEqual = {}
        notEqual[Constants.DbKeywords.NotEqual] = Constants.Deleted
        filter[Constants.Collections.Common._ID] = new ObjectId(id)
        filter[Constants.Collections.Common.DeleteFlag] = notEqual
        return filter
    }
}
export default database
