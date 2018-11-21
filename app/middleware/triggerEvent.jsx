import * as TYPES from '../actiontypes';
import {triggerEvent as agent} from '../agents/triggerEvent';
import {mapStateToActionType as settingsMap} from '../constants/settings';
import {mapStateToActionType as profileMap} from '../constants/profile';

export const triggerEventMiddleware = store => next => action => {
    switch(action.type) {
        case TYPES.FORM.CHANGE:
            if (action.meta.form  !== 'settings') break;
            agent.body(settingsMap[action.meta.field], action.payload);
            break;
        case TYPES.REHYDRATE:
            Object.keys(action.payload.settings).forEach( field => {
                agent.body(settingsMap[field], action.payload.settings[field])
            });

            if (!action.payload.profile || !action.payload.profile.profileUser) break;
            const {editingProfile, profileUser} = action.payload.profile;
            agent.body(profileMap.updateProfile, profileUser);
            if (editingProfile) agent.body(profileMap.editProfile, editingProfile);
            break;
        default:
            break;
    }
    next(action);
}