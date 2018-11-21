import {REHYDRATE} from '../actiontypes';

export const validateStoreMiddleware = store => next => action => {
    switch(action.type) {
        case REHYDRATE:
            const projects = action.payload.project.projects.filter( project => Boolean(project.id) )
            action.payload.project.projects = projects;

            action.payload.routing = null;
            break;
        default:
            break;
    }
    next(action);
}
