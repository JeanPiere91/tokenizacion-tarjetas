const responseHeader = {
    'headers': {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
    }
}
import { saveCreditCard } from '../functions/save-credit-card/index'
import { getCreditCard } from '../functions/get-credit-card/index'
import { validateToken } from '../functions/validate-token/index'
import { LOG_TYPE } from '../../shared/enum'
import { Logger } from '../../shared/logger'
import { Jwt } from '../frameworks/jsonwebtoken/Jwt'


export const handlerSaveCreditCard = async (event: any, context: any) => {
    console.log("INGRESAS")
    let response = responseHeader
    try {
        const body = JSON.parse(event.body)
        console.log("body => ", body)
        const data = await saveCreditCard(body)
        console.log("response => ", data)
        return {
            ...response,
            'statusCode': 200,
            'body': JSON.stringify(data)
        }
    } catch (error) {
        console.log(new Logger(LOG_TYPE.INFRAESTRUCTURE, { error: error }))
        return {
            ...response,
            'statusCode': 500,
            'body': JSON.stringify(error)
        }
    }
}

export const handlerGetCreditCard = async (event: any, context: any) => {
    let response = responseHeader
    try {
        const params = event.queryStringParameters
        const data = await getCreditCard(params.token)
        return {
            ...response,
            'statusCode': 200,
            'body': JSON.stringify(data)
        }
    } catch (error) {
        console.log(new Logger(LOG_TYPE.INFRAESTRUCTURE, { error: error }))
        return {
            ...response,
            'statusCode': 500,
            'body': JSON.stringify(error)
        }
    }
}


export const handlerValidateToken = async (event: any) => {
    console.log("token ", event.authorizationToken)
    const token = event.authorizationToken
    const methodArn = event.methodArn;
    try {
        const decode = new Jwt().verifyJwt(token)
        if (!decode.status) return generateAuthResponse('user', 'Deny', methodArn);
        return generateAuthResponse('user', 'Allow', methodArn)
    } catch (error) {
        console.log(new Logger(LOG_TYPE.INFRAESTRUCTURE, { error: error }))
        return generateAuthResponse('user', 'Deny', methodArn);
    }
}


const generateAuthResponse = (principalId: string, effect: string, methodArn: any) => {
    const policyDocument = generatePolicyDocument(effect, methodArn);
    return {
        principalId,
        policyDocument
    }
}

const generatePolicyDocument = (effect: string, methodArn: any) => {
    if (!effect || !methodArn) return null
    const policyDocument = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn
        }]
    };
    return policyDocument;
}
