import { saveCreditCard } from '../infraestructure/functions/save-credit-card'
import { SAVE_CREDIT_CARD_HTTP_200, SAVE_CREDIT_CARD_HTTP_400 } from './mock'


describe('Use case save credit card', () => {

    test('httpCode 200', async () => {
        const response = await saveCreditCard(SAVE_CREDIT_CARD_HTTP_200)
        expect(response.httpCode).toBe(200)
    })

    test('httpCode 400', async () => {
        const response = await saveCreditCard(SAVE_CREDIT_CARD_HTTP_400)
        expect(response.httpCode).toBe(400)
    })

}) 