import * as TYPES from '../actiontypes';

export const updateProfile = payload => {
    return {
        type: TYPES.UPDATE_PROFILE,
        payload
    }
}

export const editProfile = () => {
    return {
        type: TYPES.EDIT_PROFILE
    }
}

export const changeProfile = (field, payload) => {
    return {
        type: TYPES.CHANGE_PROFILE,
        field,
        payload
    }
}
