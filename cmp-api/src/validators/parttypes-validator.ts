import { check } from 'express-validator'
import { Constants } from '../common/constants'

export class PartTypeValidate {
    public AddPartType() {
        return [
            check(Constants.Collections.Common.Name)
                .notEmpty()
                .withMessage('name must exist'),
            check('description')
                .notEmpty()
                .withMessage(' description not empty')
        ]
    }
}
export const partTypeValidate = new PartTypeValidate()
