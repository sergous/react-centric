import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form';
import UserReducer from './user';
import ProfileReducer from './profile';
import SettingsReducer from './settings';
import AuthReducer from './auth';

export default combineReducers({
    user: UserReducer,
    profile: ProfileReducer,
    settings: SettingsReducer,
    form: FormReducer,
    auth: AuthReducer
});
