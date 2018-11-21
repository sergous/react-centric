import * as TYPES from '../actiontypes';

export default {
    [TYPES.AUTH_LOGIN_FAILED]: () => `Login with failed. Please try again.`,
    [TYPES.AUTH_USER_EXISTS]: email => `User with email ${email} is already exists. Please login.`
}