export class JwtResponse {

    status: boolean
    data: any

    constructor(status: boolean = false, data: any[]= []){
        this.status = status
        this.data = data
    }

}