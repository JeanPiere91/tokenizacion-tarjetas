import { GetCreditCardResponse } from './models/GetCreditCardResponse';
import { SaveCreditCardResponse } from './models/SaveCreditCardResponse';
import { ValidateTokenResponse } from './models/ValidateTokenResponse';

export interface IRepository {
    saveCreditCard(body: any): Promise<SaveCreditCardResponse>
    getCreditCard(token: string): Promise<GetCreditCardResponse>
    validateToken(token: string): Promise<ValidateTokenResponse>
}