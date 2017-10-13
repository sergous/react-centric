import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form';
import UserReducer from './user';

export default combineReducers({
    user: UserReducer,
    form: FormReducer
});
