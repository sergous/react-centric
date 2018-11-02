import {combineReducers} from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import UserReducer from './user';
import ProfileReducer from './profile';
import SettingsReducer from './settings';
import AuthReducer from './auth';
import ProjectReducer from './project';
import TaskReducer from './task';

export default combineReducers({
    user: UserReducer,
    profile: ProfileReducer,
    settings: SettingsReducer,
    form: FormReducer,
    auth: AuthReducer,
    routing: routerReducer,
    project: ProjectReducer,
    task: TaskReducer,
});
