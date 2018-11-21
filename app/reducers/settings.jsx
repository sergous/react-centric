import * as TYPES from '../actiontypes';
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
        case TYPES.FORM.CHANGE:
            if (action.meta.form === 'settings') {
                return {
                    ...state,
                    [action.meta.field]: action.payload
                }
            }
            return state;
        case TYPES.REHYDRATE:
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
