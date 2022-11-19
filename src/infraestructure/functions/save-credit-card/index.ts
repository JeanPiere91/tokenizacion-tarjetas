import { Pg } from '../../frameworks/pg/Pg'
import { Jwt } from '../../frameworks/jsonwebtoken/Jwt'
import { Repository } from '../../../domain/repository/dao/Repository'
import { UseCase } from '../../../application/UseCase'
import { UseCaseResponse } from '../../../application/UseCaseResponse'
import { RequestDto } from './dto/RequestDto'
import Ajv from 'ajv'
import { LOG_TYPE } from '../../../shared/enum'
import { Logger } from '../../../shared/logger'
const ajv = new Ajv()

export const saveCreditCard = async (body: any): Promise<UseCaseResponse> => {
    try {
        const valid = ajv.validate(RequestDto, body)
        if (!valid) return new UseCaseResponse(400, [ajv.errors])
        const pg = new Pg()
        const jwt = new Jwt()
        const userRepository = new Repository(pg)
        const useCaseUser = new UseCase(userRepository, jwt)
        const response = await useCaseUser.saveCreditCard(body)
        pg.close()
        return response
    } catch (error) {
        console.log(new Logger(LOG_TYPE.INFRAESTRUCTURE, { error: error }))
        return new UseCaseResponse(500, {error})
    }
    
}