import { Pg } from '../../../infraestructure/frameworks/pg/Pg';
import { IRepository } from '../IRepository'
import { SaveCreditCardResponse } from '../models/SaveCreditCardResponse';
import { GET_CREDIT_CARD, SAVE_CREDIT_CARD, VALIDATE_TOKEN } from '../../../shared/constant';
import { randomString } from '../../../shared/utils';
import { GetCreditCardResponse } from '../models/GetCreditCardResponse';
import { ValidateTokenResponse } from '../models/ValidateTokenResponse';
import { LOG_TYPE } from '../../../shared/enum';
import { Logger } from '../../../shared/logger';


export class Repository implements IRepository {

    database: Pg;

    constructor(database: Pg) {
        this.database = database
    }

    async saveCreditCard(body: any): Promise<SaveCreditCardResponse> {
        try {
            const { status, data } = await this.database.executeQuery(SAVE_CREDIT_CARD, [
                body.email,
                body.card_number,
                body.cvv,
                body.expiration_year,
                body.expiration_month,
                randomString(16)
            ])
            let saveCreditCardResponse = new SaveCreditCardResponse()
            saveCreditCardResponse.status = status
            saveCreditCardResponse.token = {
                value: data[0]['fn_save_credit_card']
            }
            return saveCreditCardResponse
        } catch (error) {
            console.log(new Logger(LOG_TYPE.REPOSITORY, { error: error }))
            return new SaveCreditCardResponse()
        }

    }

    async getCreditCard(token: string): Promise<GetCreditCardResponse> {
        try {
            const { status, data } = await this.database.executeQuery(GET_CREDIT_CARD, [token])
            const getCreditCardResponse: GetCreditCardResponse = {
                status: status,
                data: data.map(record => {
                    return {
                        email: record["email"],
                        cardNumber: record["card_number"],
                        expirationYear: record["expiration_year"],
                        expirationMonth: record["expiration_month"]
                    }
                })
            }
            return getCreditCardResponse;
        } catch (error) {
            console.log(new Logger(LOG_TYPE.REPOSITORY, { error: error }))
            return new GetCreditCardResponse()
        }

    }

    async validateToken(token: string): Promise<ValidateTokenResponse> {
        try {
            const { status, data } = await this.database.executeQuery(VALIDATE_TOKEN, [token])
            console.log(data)
            const validateTokenResponse = new ValidateTokenResponse()
            validateTokenResponse.status = status
            validateTokenResponse.data = {
                valid: data[0]['fn_validate_token']
            }
            return validateTokenResponse;
        } catch (error) {
            console.log(new Logger(LOG_TYPE.REPOSITORY, { error: error }))
            return new ValidateTokenResponse()
        }

    }
}