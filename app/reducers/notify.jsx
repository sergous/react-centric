import * as TYPES from '../actiontypes';
import { NOTIFY_MESSAGES } from '../constants';

export default (state = {}, action) => {
    switch(action.type) {
        case TYPES.AUTH_LOGIN_FAILED:
        case TYPES.AUTH_USER_EXISTS:
            return {
                ...state,
                auth: {
                    submitError: NOTIFY_MESSAGES[action.type](action.payload)
                }
            }
        case TYPES.LOCATION_CHANGE:
        case TYPES.FORM.CHANGE:
            return {
                ...state,
                auth: {
                    submitError: null
                }
            }
        default:
            return state;
    }
}
