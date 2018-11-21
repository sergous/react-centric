import * as TYPES from '../actiontypes';

export function signup(email, password) {
    return {
        type: TYPES.REGISTER,
        email,
        password
    }
}

export function login(email, password) {
    return {
        type: TYPES.LOGIN,
        email,
        password
    }
}

export function recover(email) {
    return {
        type: TYPES.RECOVER,
        email
    }
}