const SCHEMA='public'
const SAVE_CREDIT_CARD =`select *from ${SCHEMA}.fn_save_credit_card($1,$2,$3,$4,$5,$6)`
const GET_CREDIT_CARD =`select *from ${SCHEMA}.fn_validate_credit_card($1)`
const VALIDATE_TOKEN =`select *from ${SCHEMA}.fn_validate_token($1)`


export {
    SAVE_CREDIT_CARD,
    GET_CREDIT_CARD,
    VALIDATE_TOKEN
}