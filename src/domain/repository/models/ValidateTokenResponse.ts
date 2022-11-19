import { Valid } from "../entities/Valid"

export class ValidateTokenResponse {
    status: boolean
    data: Valid
    constructor(status: boolean = false, data : Valid = { valid :false}) {
        this.status = status
        this.data = data
    }

}
