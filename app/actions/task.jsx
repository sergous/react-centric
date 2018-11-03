import * as TYPES from '../actiontypes/task'
import { LOCATION_CHANGE } from 'react-router-redux'

export const createTask = task => {
    return {
        type: TYPES.CREATE_TASK,
        task,
    }
}

export const addTask = task => {
    return {
        type: TYPES.ADD_TASK,
        task,
    }
}

export const updateTask = (id, task) => {
    return {
        type: TYPES.UPDATE_TASK,
        id,
        task,
    }
}

export const updateOpenTask = (field, payload) => {
    return {
        type: TYPES.UPDATE_OPEN_TASK,
        field,
        payload,
    }
}

export const editTask = task => {
    return {
        type: TYPES.EDIT_TASK,
        task,
    }
}

export const editTaskProp = (field, payload) => {
    return {
        type: TYPES.EDIT_TASK_PROP,
        field,
        payload,
    }
}

export const closeTask = () => {
    return {
        type: TYPES.CLOSE_TASK,
    }
}

export const openTask = payload => {
    return {
        type: LOCATION_CHANGE,
        payload: {
            action: 'PUSH',
            pathname: '/pages/tasks',
            query: {},
            hash: '',
            search: '',
        },
    }
}

export const changeTask = (field, payload) => {
    return {
        type: TYPES.CHANGE_TASK,
        field,
        payload,
    }
}

export const removeTask = id => {
    return {
        type: TYPES.REMOVE_TASK,
        id,
    }
}

export const searchTask = payload => {
    return {
        type: TYPES.REMOVE_TASK,
        payload,
    }
}

export const reorderTasks = payload => {
    return {
        type: TYPES.REORDER_TASKS,
        payload,
    }
}

export const collapseTasks = payload => {
    return {
        type: TYPES.COLLAPSE_TASKS,
        payload,
    }
}
