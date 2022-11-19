import { CreditCard } from '../entities/CreditCard';

export class GetCreditCardResponse {
    status: boolean
    data: CreditCard[]

    constructor(status: boolean = false, data : CreditCard[]= []) {
        this.status = status
        this.data = data
    }

}
