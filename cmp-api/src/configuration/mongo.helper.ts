import * as mongo from 'mongodb'
import { databaseLogger } from '../logger/database.logger'

export class MongoHelper {
    private static readonly _dbName: string = process.env.CMP_DB_NAME || 'cmp-dev'
    public static client: mongo.MongoClient

    public static connect(url: string): Promise<object> {
        return new Promise<object>((resolve, reject) => {
            mongo.MongoClient.connect(
                url,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err: mongo.MongoError, client: mongo.MongoClient) => {
                    if (err) {
                        reject(err)
                    } else {
                        MongoHelper.client = client
                        mongo.Logger.setLevel('debug')
                        mongo.Logger.filter('class', ['Db', 'Cursor'])
                        // Set our own logger
                        mongo.Logger.setCurrentLogger(function(msg) {
                            databaseLogger(msg)
                        })
                        resolve(client)
                    }
                }
            )
        })
    }

    public static getCollection(collectionName: string): mongo.Collection<object> {
        return MongoHelper.client?.db(MongoHelper._dbName).collection(collectionName)
    }

    public disconnect(): void {
        MongoHelper.client.close()
    }
}
