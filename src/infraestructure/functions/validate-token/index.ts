import { Pg } from '../../frameworks/pg/Pg'
import { Jwt } from '../../frameworks/jsonwebtoken/Jwt'
import { Repository } from '../../../domain/repository/dao/Repository'
import { UseCase } from '../../../application/UseCase'
import { UseCaseResponse } from '../../../application/UseCaseResponse'
import { LOG_TYPE } from '../../../shared/enum'
import { Logger } from '../../../shared/logger'

export const validateToken = async (token: string): Promise<UseCaseResponse>  => {
    try {
        const pg = new Pg()
        const jwt = new Jwt()
        const userRepository = new Repository(pg)
        const useCaseUser = new UseCase(userRepository, jwt)
        const response = await useCaseUser.validateToken(token)
        return response
    } catch (error) {
        console.log(new Logger(LOG_TYPE.INFRAESTRUCTURE, { error: error }))
        return new UseCaseResponse(500, {error})
    }
}
