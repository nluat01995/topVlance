import { MESSAGES } from "@nestjs/core/constants";

export const AuthConstants = {
    REGISTER_SUCCESS: {
        CODE: 1000,
        MESSAGE: 'REGISTER SUCCESS'
    },
    REGISTER_FAILED: {
        CODE: 1000,
        MESSAGE: 'REGISTER FAILED'
    },
    SUCCESS: {
        CODE: 1000,
        MESSAGE: 'LOGIN SUCCESS'
    },
    FAILED: {
        CODE: 1001,
        MESSAGE: 'LOGIN FAILED'
    },
    DUPLICATE: {
        CODE: 403,
        MESSAGE: 'EMAIL DUPLICATE'
    },
    EMAIL_EXIST: {
        CODE: 403,
        MESSAGE: 'EMAIL EXIST'

    },
    ERROR: {
        CODE: 500,
        MESSAGE: 'INTERNAL ERROR SERVER'
    }
}