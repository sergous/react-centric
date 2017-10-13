import * as TYPES from '../actiontypes/user';
import * as FORM_TYPES from 'redux-form/lib/actionTypes';

const initialState = {
    users: [
        {
            id: 1,
            photo: 'img/user/01.jpg',
            name: 'Sergey Smirnov',
            position: 'Software Developer',
            company: 'Company Inc.',
            about: `Proin est sapien, convallis non hendrerit nec, laoreet ut ipsum. Sed pharetra euismod dolor, id feugiat ante volutpat eget.`
        }
    ],
    userImages: [
        {width: 900, height: 500, alt: "User 1", src: "img/user/01.jpg"},
        {width: 900, height: 500, alt: "User 2", src: "img/user/02.jpg"},
        {width: 900, height: 500, alt: "User 3", src: "img/user/03.jpg"},
        {width: 900, height: 500, alt: "User 4", src: "img/user/04.jpg"},
        {width: 900, height: 500, alt: "User 5", src: "img/user/05.jpg"},
        {width: 900, height: 500, alt: "User 6", src: "img/user/06.jpg"},
        {width: 900, height: 500, alt: "User 7", src: "img/user/07.jpg"},
    ],
    nextId: 3,
    openUser: null,
    editingUser: null,
    editingProp: null,
    isNew: false,
    searchQuery: null
};

export default function User(state = initialState, action) {
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
        case FORM_TYPES.CHANGE:
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

            let users = [];
            if (state.users.length > 1) {
                users = [
                    ...state.users.slice(0, index),
                    ...state.users.slice(index + 1)
                ]
            }

            return {
                ...state,
                users
            };
        default:
            return state;
    }
}
