import * as TYPES from '../actiontypes';
import { initialState } from '../constants/user';

export default (state = initialState, action) => {
    switch(action.type) {
        case TYPES.SEARCH_USER:
            return {
                ...state,
                searchQuery: action.payload
            };
        case TYPES.CREATE_USER:
            return {
                ...state,
                editingUser: {...action.user},
                editingProp: null,
                isNew: true
            };
        case TYPES.ADD_USER:
            return {
                ...state,
                nextId: state.nextId + 1,
                users: [
                    ...state.users,
                    {...action.user, id: state.nextId}
                ],
                editingUser: null,
                isNew: false
            };
        case TYPES.EDIT_USER:
            return {
                ...state,
                editingUser: action.user,
                editingProp: null,
                isNew: false
            };
        case TYPES.EDIT_USER_PROP:
            let editingProp = action.field ? {name: action.field, value: action.payload} : null;
            return {
                ...state,
                editingProp
            };
        case TYPES.FORM.CHANGE:
            if (action.meta.form === 'users') {
                const searchQuery = action.meta.field === 'query' ? action.payload : null;
                return {
                    ...state,
                    searchQuery
                }
            }
            if (action.meta.form !== 'user') return state;

            if (state.editingUser) {
                const editingUser = {...state.editingUser};
                editingUser[action.meta.field] = action.payload;
                return {
                    ...state,
                    editingUser
                };
            } else if (state.editingProp) {
                editingProp = { ...state.editingProp }
                if (action.meta.field === editingProp.name)
                    editingProp = { ...editingProp, value: action.payload };
                return {
                    ...state,
                    editingProp
                };
            }
            return state;
        case TYPES.OPEN_USER:
            editingProp = null;
            if (!action.user.about || (action.user.about && action.user.about.length < 3))
                editingProp = {name: 'about', value: action.user.about};
            return {
                ...state,
                openUser: action.user,
                editingUser: null,
                editingProp
            };
        case TYPES.CLOSE_USER:
            return {
                ...state,
                openUser: null,
                editingUser: null
            };
        case TYPES.CHANGE_USER:
            const editingUser = {...state.editingUser, [action.field]: action.payload}
            return {
                ...state,
                editingUser
            };
        case TYPES.UPDATE_USER:
            const updatedUsers = state.users.map( (user) => {
                if (user.id === action.id) return { ...action.user};

                return {...user};
            });

            return {
                ...state,
                users: updatedUsers,
                editingUser: null
            };
        case TYPES.UPDATE_OPEN_USER:
            let openUser = { ...state.openUser };
            const updatedOpenUsers = state.users.map( (user) => {
                if (user.id === state.openUser.id) {
                    openUser = { ...openUser, [action.field]: action.payload};
                    return openUser;
                }

                return {...user};
            });

            return {
                ...state,
                openUser,
                users: updatedOpenUsers
            };
        case TYPES.REMOVE_USER:
            let index = null;
            state.users.forEach((user, i) => {
                if (user.id !== action.id) return;

                index = i;
            });
            if (!index) return state;

            if (state.users.length > 1) {
                return {
                    ...state,
                    users: [
                        ...state.users.slice(0, index),
                        ...state.users.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                users: []
            };
        default:
            return state;
    }
}
