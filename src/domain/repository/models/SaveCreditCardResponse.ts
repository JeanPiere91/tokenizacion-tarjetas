import { Token } from '../entities/Token';

export class SaveCreditCardResponse {
    status: boolean
    token: Token

    constructor(status: boolean = false, token = { value: '' }) {
        this.status = status
        this.token = token
    }

}
