import { LOCATION_CHANGE } from 'react-router-redux'

export default function ui(state = {}, action) {
    switch(action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                pathname: action.payload.pathname
            }
        default:
            return state;
    }
}