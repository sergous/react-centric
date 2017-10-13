import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form';
import UserReducer from './user';
import SettingsReducer from './settings';

export default combineReducers({
    user: UserReducer,
    settings: SettingsReducer,
    form: FormReducer
});
