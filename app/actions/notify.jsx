import * as types from '../actiontypes/notify';

export function authUserExists(payload) {
    return {
        type: types.AUTH_USER_EXISTS,
        payload
    }
}

export function authLoginFailed(payload) {
    return {
        type: types.AUTH_LOGIN_FAILED,
        payload
    }
}