import * as types from '../actiontypes/auth';

export function signup(email, password) {
    return {
        type: types.REGISTER,
        email,
        password
    }
}

export function login(email, password) {
    return {
        type: types.LOGIN,
        email,
        password
    }
}

export function recover(email) {
    return {
        type: types.RECOVER,
        email
    }
}