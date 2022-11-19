import { validateToken } from '../infraestructure/functions/validate-token'
import { SAVE_CREDIT_CARD_HTTP_200, SAVE_CREDIT_CARD_HTTP_400 } from './mock'


describe('Use case save credit card', () => {

    test('Allow', async () => {
        const response = await validateToken("cabcuOSmMRvAmwR2")
        expect(response.data.valid).toEqual(true)
    })

    test('Denny', async () => {
        const response = await validateToken("121212")
        expect(response.data.valid).toEqual(false)
    })

}) 