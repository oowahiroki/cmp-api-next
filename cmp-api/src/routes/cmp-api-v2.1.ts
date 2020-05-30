import * as express from 'express'
import { Request, Response } from 'express'
import { PartTypeController } from '../controllers/parttypes.controller'
import { partItemController } from '../controllers/partItem-controller'
import { utils } from '../common/util'
import { partTypeValidate } from '../validators/parttypes-validator'
const router = express.Router()
function exceptionHandler(fn: Function) {
    return function (req: Request, res: Response, next: express.NextFunction) {
        fn(req, res, next).catch(err => {
            console.log('base.exceptionHandler', err)
            utils.internalServerResponse(err.message, res)
        })
    }
}

router.get('/part-type', exceptionHandler(PartTypeController.getAllPartType))
router.post(
    '/partType',
    partTypeValidate.AddPartType(),
    exceptionHandler(PartTypeController.addPartType)
)
router.get('/part-type/:id', exceptionHandler(PartTypeController.getPartTypeById))
router.delete('/part-type/:id', exceptionHandler(PartTypeController.deletePartTypeById))
router.put('/part-type/:id', exceptionHandler(PartTypeController.updatePartTypeById))

router.get('/part-item', exceptionHandler(partItemController.getAll))
router.get('/part-item/:id', exceptionHandler(partItemController.findByID))
router.post('/part-item', exceptionHandler(partItemController.addPartItem))
router.put('/part-item/:id', exceptionHandler(partItemController.Update))
router.delete('/part-item/:id', exceptionHandler(partItemController.DeleteById))

//create-blueprint-events
export default router
