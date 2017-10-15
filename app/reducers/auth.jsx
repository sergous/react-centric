import * as types from '../actiontypes/auth';
import * as FORM_TYPES from 'redux-form/lib/actionTypes';
import { initialState } from '../constants/auth';

const forms = ['login', 'signup', 'recover'];

export default function Auth(state = initialState, action) {
    switch(action.type) {
        case FORM_TYPES.CHANGE:
            if (forms.includes(action.meta.form)) {
                const email = action.meta.field === 'accountName'
                    ? action.payload
                    : state.email;
                const password = action.meta.field === 'accountPassword'
                    ? action.payload
                    : state.password;
                return {
                    ...state,
                    email,
                    password
                }
            }
            return state;
        case types.REGISTER:
            return {
                ...state,
                email: action.email,
                password: action.password
            }
        case types.LOGIN:
            return {
                ...state,
                email: action.email,
                password: action.password
            }
        case types.RECOVER:
            return {
                ...state,
                email: action.email
            }
        default:
            return state;
    }
}
