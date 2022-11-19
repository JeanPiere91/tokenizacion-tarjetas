import { JWT_SECRET_KEY, JWT_EXPIRES_TOKEN } from '../../../shared/config'
import { sign, verify } from 'jsonwebtoken'
import { JwtResponse } from './models/JwtResponse'
import { LOG_TYPE } from '../../../shared/enum';
import { Logger } from '../../../shared/logger';

export class Jwt {

    constructor() {
    }

    generateToken(payload: any): JwtResponse {
        let jwtResponse = new JwtResponse()
        try {
            const token = sign(payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_TOKEN});
            jwtResponse.status = true
            jwtResponse.data = token
            return jwtResponse
        } catch (error) {
            console.log(new Logger(LOG_TYPE.JWT, { error: error }))
            jwtResponse.status = false
            jwtResponse.data = error
            return jwtResponse
        }
    }

    verifyJwt = (token: string): JwtResponse => {
        let jwtResponse = new JwtResponse()
        try {
            verify(token, JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    jwtResponse.status = false
                    jwtResponse.data = "token inválido"
                }else{
                    jwtResponse.status = true
                    jwtResponse.data = decoded
                }
            })
            return jwtResponse
        } catch (error) {
            console.log(new Logger(LOG_TYPE.JWT, { error: error }))
            jwtResponse.status = false
            jwtResponse.data = error
            return jwtResponse
        }
    }

}