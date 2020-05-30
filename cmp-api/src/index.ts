import 'reflect-metadata'
import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { ApplicationsAController } from './controllers/applications.a.controller'
import { MongoHelper } from './configuration/mongo.helper'
import { ExceptionMiddleware } from './middleware/exception.middleware'
import { RequestMiddleware } from './middleware/request.middleware'
import { BlueprintEventsController } from './controllers/blueprint.events.controller'
import { ApplicationsBController } from './controllers/applications.b.controller'
import { CopesController } from './controllers/copes.controller'
import { EventsController } from './controllers/events.controller'
import { InfrastructuresAController } from './controllers/infrastructures.a.controller'
import { InfrastructuresBController } from './controllers/infrastructures.b.controller'
import { NetworksAController } from './controllers/networks.a.controller'
import { NetworksBController } from './controllers/networks.b.controller'
import { OperationEventsController } from './controllers/operation.events.controller'
import { PartTypesController } from './controllers/parttypes.controller'
import { MastersAController } from './controllers/master.controller'
import { PartsController } from './controllers/parts.controller'
import { CatalogController } from './controllers/catalogs.controller'
import { MasterItemsController } from './controllers/master.items.controller'
import { PartItemController } from './controllers/part.item.controller'
/**
 * Setup routing-controllers to use typedi container.
 */
useContainer(Container)

const app = createExpressServer({
    defaultErrorHandler: false,
    routePrefix: '/mo',
    controllers: [
        ApplicationsAController,
        ApplicationsBController,
        BlueprintEventsController,
        CopesController,
        EventsController,
        InfrastructuresAController,
        InfrastructuresBController,
        NetworksAController,
        NetworksBController,
        OperationEventsController,
        PartTypesController,
        PartItemController,
        MastersAController,
        PartsController,
        MasterItemsController,
        CatalogController
    ],
    middlewares: [RequestMiddleware, ExceptionMiddleware]
})

app.listen(30000, async () => {
    console.log('> Ready on http://localhost:30000')
    try {
        const uri = `mongodb://localhost:27017/cmp-dev`
        await MongoHelper.connect(uri)
        console.info(`Connected to Mongo!`)
    } catch (error) {
        console.error('Unable to connecto to MongoDB!', error)
    }
})
