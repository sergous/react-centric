import * as FORM_TYPES from 'redux-form/lib/actionTypes';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {triggerEvent as agent} from '../agents/triggerEvent';
import {mapStateToActionType as map} from '../constants/settings';

export const triggerEventMiddleware = store => next => action => {
    switch(action.type) {
        case FORM_TYPES.CHANGE:
            if (action.meta.form  !== 'settings') break;
            agent.body(map[action.meta.field], action.payload);
            break;
        case REHYDRATE:
            Object.keys(action.payload.settings).forEach( field => {
                agent.body(map[field], action.payload.settings[field])
            });
            break;
        default:
            break;
    }
    next(action);
}