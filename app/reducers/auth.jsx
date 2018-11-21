import * as TYPES from '../actiontypes';
import { initialState } from '../constants/auth';

const forms = ['login', 'signup', 'recover'];

export default (state = initialState, action) => {
    switch(action.type) {
        case TYPES.FORM.CHANGE:
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
        case TYPES.REGISTER:
            return {
                ...state,
                email: action.email,
                password: action.password
            }
        case TYPES.LOGIN:
            return {
                ...state,
                email: action.email,
                password: action.password
            }
        case TYPES.RECOVER:
            return {
                ...state,
                email: action.email
            }
        default:
            return state;
    }
}
