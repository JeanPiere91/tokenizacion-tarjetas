export const RequestDto = {
    type: "object",
    properties: {
        token: { type: "string", minLength: 16, maxLength: 16 }
    },
    required: [
        "token"
    ],
    additionalProperties: false,
}