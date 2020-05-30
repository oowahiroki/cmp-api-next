import { Response } from 'express'

export const utils = Object.freeze({
    successResponse: (result: object | string, res: Response) => {
        return res.status(200).json(result)
    },
    failureLogicResponse: (result: object | string, res: Response) => {
        return res.status(200).json(result)
    },
    internalServerResponse: (result: object | string, res: Response) => {
        return res.status(500).json(result)
    },
    badRequestResponse: (result: object | string, res: Response) => {
        return res.status(400).json(result)
    },
    unAuthorized: (result: object | string, res: Response) => {
        return res.status(403).json(result)
    },
    unAuthentication: (result: object | string, res: Response) => {
        return res.status(401).json(result)
    }
})
