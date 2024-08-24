import { MESSAGES } from "@nestjs/core/constants";

export const PostProjectConstants = {
    CREATE_SUCCESS: {
        CODE: 1000,
        MESSAGE: 'TẠO DỰ ÁN THÀNH CÔNG'
    },
    CREATE_FAILED: {
        CODE: 1001,
        MESSAGE: 'TẠO DỰ ÁN THẤT BẠI'
    },
    GET_SUCCESS: {
        CODE: 1000,
        MESSAGE: 'LẤY DỰ ÁN THÀNH CÔNG'
    },
    GET_FAILED: {
        CODE: 1001,
        MESSAGE: 'LẤY DỰ ÁN THẤT BẠI'
    },
    INTERAL_ERROR: {
        CODE: 500,
        MESSAGE: 'INTERNAL ERROR SERVER'
    }
}