import * as TYPES from '../actiontypes/user';
import { LOCATION_CHANGE } from 'react-router-redux'

export const createUser = user => {
    return {
        type: TYPES.CREATE_USER,
        user
    }
}

export const addUser = user => {
    return {
        type: TYPES.ADD_USER,
        user
    }
}

export const updateUser = (id, user) => {
    return {
        type: TYPES.UPDATE_USER,
        id,
        user
    }
}

export const updateOpenUser = (field, payload) => {
    return {
        type: TYPES.UPDATE_OPEN_USER,
        field,
        payload
    }
}

export const editUser = (user) => {
    return {
        type: TYPES.EDIT_USER,
        user
    }
}

export const editUserProp = (field, payload) => {
    return {
        type: TYPES.EDIT_USER_PROP,
        field,
        payload
    }
}

export const closeUser = () => {
    return {
        type: TYPES.CLOSE_USER
    }
}

export const openUser = (user) => {
    return {
        type: TYPES.OPEN_USER,
        user
    }
}

export const openUsers = () => {
    return {
        type: LOCATION_CHANGE,
        payload: {
            action: 'PUSH',
            pathname: '/pages/contacts',
            query: {},
            hash: '',
            search: '',
        },
    }
}

export const changeUser = (field, payload) => {
    return {
        type: TYPES.CHANGE_USER,
        field,
        payload
    }
}

export const removeUser = id => {
    return {
        type: TYPES.REMOVE_USER,
        id
    }
}

export const searchUser = payload => {
    return {
        type: TYPES.REMOVE_USER,
        payload
    }
}
