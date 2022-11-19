CREATE TABLE culqi.tokens (
	"email" varchar(100) NOT NULL,
	"card_number" varchar(16) NOT NULL,
	"cvv" varchar(4) NOT NULL,
	"expiration_year" varchar(4) NOT NULL,
	"expiration_month" varchar(2) NOT NULL,
	"token" varchar(16) NOT NULL,
	expired_at timestamp(6) NOT NULL default CURRENT_TIMESTAMP + (15 * interval '1 minute'),
	created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamp(6) NULL
);

CREATE OR REPLACE FUNCTION culqi.fn_save_credit_card(in_email characterPrivateApi varying, in_card_number character varying,
in_cvv character varying,in_expiration_year character varying,in_expiration_month character varying,in_token character varying)
 RETURNS character
 LANGUAGE sql
AS $function$
	insert into culqi.tokens(email,card_number,cvv,expiration_year, expiration_month,"token")values(in_email,in_card_number, in_cvv,in_expiration_year,in_expiration_month, in_token) RETURNING in_token;
$function$
;

select *from  culqi.fn_save_credit_card('jeanpiere.bellota@gmail.com','4000000000000016','001','2026','02','token_123');


create FUNCTION culqi.fn_validate_credit_card(in_token character varying)
 RETURNS table(email character varying, card_number character varying, expiration_year character varying, expiration_month character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT t.email,t.card_number,t.expiration_year,t.expiration_month
    FROM culqi.tokens t
    WHERE t.expired_at >= now() and t.token=in_token;
END
$function$
;

select *from  culqi.fn_validate_credit_card('b1IO3OnYz0wPJCCI');

CREATE OR REPLACE FUNCTION public.fn_validate_token(in_token character varying)
 RETURNS TABLE(email character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT t.email
    FROM public.tokens t
    WHERE t.expired_at >= now() and t.token=in_token;
END
$function$;

