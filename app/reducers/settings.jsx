import * as FORM_TYPES from 'redux-form/lib/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {THEMES_CLASS_NAMES, MENU_LINK_CLASS_NAMES} from '../constants/settings';

const initialState = {
    theme: THEMES_CLASS_NAMES[0],
    sidebarShowheader: false,
    sidebarShowtoolbar: true,
    sidebarOffCanvas: false,
    headerMenulink: MENU_LINK_CLASS_NAMES.SLIDE,
}

export default function Settings(state = initialState, action) {
    switch(action.type) {
        case FORM_TYPES.CHANGE:
            if (action.meta.form === 'settings') {
                return {
                    ...state,
                    [action.meta.field]: action.payload
                }
            }
            return state;
        case REHYDRATE:
            return {
                ...state,
                ...action.payload.settings
            }
        default:
            return {
                ...state
            }
    }
}
