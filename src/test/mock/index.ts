const SAVE_CREDIT_CARD_HTTP_200 = {
    email: 'jeanpiere.bellota@gmail.com',
    card_number: '5000000000001',
    cvv: '123',
    expiration_year: '2050',
    expiration_month: '03',
}

const SAVE_CREDIT_CARD_HTTP_400 = {
    email: '',
    card_number: '5000000000001',
    cvv: '123',
    expiration_year: '2050',
    expiration_month: '03',
}

const GET_CREDIT_CARD_HTTP_200 = {
    token: 'CMOv50o2XmsIfEJv'
}

const GET_CREDIT_CARD_HTTP_204 = {
    token: 'HY8bbNgDcOw4KP4i'
}

const GET_CREDIT_CARD_HTTP_400 = {
    token: '',
}

export {
    SAVE_CREDIT_CARD_HTTP_200,
    SAVE_CREDIT_CARD_HTTP_400,
    GET_CREDIT_CARD_HTTP_200,
    GET_CREDIT_CARD_HTTP_204,
    GET_CREDIT_CARD_HTTP_400
}