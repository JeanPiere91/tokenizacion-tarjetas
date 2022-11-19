export class UseCaseResponse {

    httpCode: number
    data: any

    constructor(httpCode: number = 200, data: {} = {}){
        this.httpCode = httpCode
        this.data = data
    }

}