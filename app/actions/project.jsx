import * as TYPES from '../actiontypes/project';
import { locationChange } from './ui';
import { PROJECTS_PATH } from '../constants/routes';

export const createProject = project => {
    return {
        type: TYPES.CREATE_PROJECT,
        project
    }
}

export const addProject = project => {
    return {
        type: TYPES.ADD_PROJECT,
        project
    }
}

export const updateProject = (id, project) => {
    return {
        type: TYPES.UPDATE_PROJECT,
        id,
        project
    }
}

export const updateOpenProject = (field, payload) => {
    return {
        type: TYPES.UPDATE_OPEN_PROJECT,
        field,
        payload
    }
}

export const editProject = (project) => {
    return {
        type: TYPES.EDIT_PROJECT,
        project
    }
}

export const editProjectProp = (field, payload) => {
    return {
        type: TYPES.EDIT_PROJECT_PROP,
        field,
        payload
    }
}

export const closeProject = () => {
    return {
        type: TYPES.CLOSE_PROJECT
    }
}

export const openProject = (project) => {
    return {
        type: TYPES.OPEN_PROJECT,
        project
    }
}

export const openProjects = () => dispatch => dispatch(locationChange({pathname: PROJECTS_PATH}))

export const changeProject = (field, payload) => {
    return {
        type: TYPES.CHANGE_PROJECT,
        field,
        payload
    }
}

export const removeProject = id => {
    return {
        type: TYPES.REMOVE_PROJECT,
        id
    }
}

export const searchProject = payload => {
    return {
        type: TYPES.SEARCH_PROJECT,
        payload
    }
}
