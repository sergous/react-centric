import * as TYPES from '../actiontypes/task';
import { initialState } from '../constants/task';

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPES.REORDER_TASKS:
            return { ...state, tasks: action.payload };
        case TYPES.COLLAPSE_TASKS:
            return { ...state, isCollapsed: action.payload };
        default:
            return state;
    }
};
