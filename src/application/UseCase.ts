import { Repository } from '../domain/repository/dao/Repository'
import { Jwt } from '../infraestructure/frameworks/jsonwebtoken/Jwt'
import { LOG_TYPE } from '../shared/enum'
import { Logger } from '../shared/logger'
import { UseCaseResponse } from './UseCaseResponse'

export class UseCase {

    repository: Repository
    jwt: Jwt
    constructor(repository: Repository, jwt: Jwt) {
        this.repository = repository
        this.jwt = jwt
    }

    async saveCreditCard(body: any): Promise<UseCaseResponse> {
        try {
            const { status, token } = await this.repository.saveCreditCard(body)
            if (!status) return new UseCaseResponse(500)
            const generate = this.jwt.generateToken({code:  token.value})
            const reponse = new UseCaseResponse(200, {code:  token.value, token: generate.data })
            return reponse
        } catch (error) {
            console.log(new Logger(LOG_TYPE.USE_CASE, { error: error }))
            return new UseCaseResponse(500)
        }

    }

    async getCreditCard(token: string): Promise<UseCaseResponse> {
        try {
            const { status, data } = await this.repository.getCreditCard(token)
            if (!status) return new UseCaseResponse(500)
            if (data.length == 0) return new UseCaseResponse(204)
            const reponse = new UseCaseResponse(200, data)
            return reponse
        } catch (error) {
            console.log(new Logger(LOG_TYPE.USE_CASE, { error: error }))
            return new UseCaseResponse(500)
        }
    }

    async validateToken(token: string): Promise<UseCaseResponse> {
        try {
            const { status, data } = await this.repository.validateToken(token)
            if (!status) return new UseCaseResponse(500)
            const reponse = new UseCaseResponse(200, data)
            return reponse
        } catch (error) {
            console.log(new Logger(LOG_TYPE.USE_CASE, { error: error }))
            return new UseCaseResponse(500)
        }
    }

}
