export class Logger {
    type: string
    message: any

    constructor(type: string, message: any) {
        this.type = type
        this.message = message
    }

    toString = () => {
        return JSON.stringify({type: this.type,message: this.message})
    }

}