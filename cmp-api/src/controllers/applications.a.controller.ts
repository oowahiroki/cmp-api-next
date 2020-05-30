import { Response } from 'express'
import { Get, JsonController, Res, Post, Body, Param } from 'routing-controllers'
import { Service } from 'typedi'
import { ApplicationsARespository } from '../repositories/applications.a.repo'
import { Constants } from '../common/constants'
import { BaseController } from './base.controller'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class ApplicationARequest {
    @IsEmail({}, { message: 'Email is invalid' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string
}

@Service()
@JsonController(Constants.V3)
export class ApplicationsAController extends BaseController {
    constructor(private applicationARepository: ApplicationsARespository) {
        super()
    }

    @Get('/applications-a/complex')
    async getComplex(@Res() response: Response) {
        return this.successResponse(await this.applicationARepository.findComplex(), response)
    }

    @Get('/applications-a')
    async getAll(@Res() response: Response) {
        return this.successResponse(await this.applicationARepository.getAll(), response)
    }

    @Get('/applications-a/:id')
    async getDetail(@Param('id') id: string, @Res() response: Response) {
        return this.successResponse(await this.applicationARepository.findById(id), response)
    }

    @Post('/applications-a')
    async createApplicationA(@Body() body: ApplicationARequest, @Res() response: Response) {
        return this.successResponse(body, response)
    }
}
