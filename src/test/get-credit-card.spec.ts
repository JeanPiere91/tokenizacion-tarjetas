import { getCreditCard } from '../infraestructure/functions/get-credit-card'
import { GET_CREDIT_CARD_HTTP_200, GET_CREDIT_CARD_HTTP_204, GET_CREDIT_CARD_HTTP_400 } from './mock'


describe('Use case get credit card', () => {

    test('httpCode 200', async () => {
        const response = await getCreditCard(GET_CREDIT_CARD_HTTP_200)
        expect(response.httpCode).toBe(200)
    })

    test('httpCode 204', async () => {
        const response = await getCreditCard(GET_CREDIT_CARD_HTTP_204)
        expect(response.httpCode).toBe(204)
    })

    test('httpCode 400', async () => {
        const response = await getCreditCard(GET_CREDIT_CARD_HTTP_400)
        expect(response.httpCode).toBe(400)
    })

}) 