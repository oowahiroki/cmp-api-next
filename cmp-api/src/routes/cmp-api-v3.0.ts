import * as express from 'express'
const router = express.Router()
import { Request, Response } from 'express'
import { utils } from '../common/util'
import { operationEventsController } from '../controllers/operation.events.controller'

function exceptionHandler(fn: Function) {
    return function(req: Request, res: Response, next: express.NextFunction) {
        fn(req, res, next).catch((err: { message: string | object }) => {
            console.log('base.exceptionHandler', err)
            utils.internalServerResponse(err.message, res)
        })
    }
}
// handler operation-events
router.get('/operation-events', exceptionHandler(operationEventsController.getAll))
router.post('/operation-events', exceptionHandler(operationEventsController.addOperationEvents))
router.put('/operation-events/:id', exceptionHandler(operationEventsController.updateOperationEvents))
//router.get('/operation-events/:id', exceptionHandler(operationEventsController.getOneOperationEvents))
router.delete('/operation-events/:id', exceptionHandler(operationEventsController.deleteOperationEvents))

export default router
