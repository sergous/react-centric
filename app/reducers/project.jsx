import * as TYPES from '../actiontypes/project';
import * as FORM_TYPES from 'redux-form/lib/actionTypes';
import { initialState } from '../constants/project';

export default function Project(state = initialState, action) {
    switch(action.type) {
        case TYPES.SEARCH_PROJECT:
            return {
                ...state,
                searchQuery: action.payload
            };
        case TYPES.CREATE_PROJECT:
            return {
                ...state,
                editingProject: {...action.project},
                editingProp: null,
                isNew: true
            };
        case TYPES.ADD_PROJECT:
            return {
                ...state,
                nextId: state.nextId + 1,
                projects: [
                    ...state.projects,
                    {...action.project, id: state.nextId}
                ],
                editingProject: null,
                isNew: false
            };
        case TYPES.EDIT_PROJECT:
            return {
                ...state,
                editingProject: action.project,
                editingProp: null,
                isNew: false
            };
        case TYPES.EDIT_PROJECT_PROP:
            return {
                ...state,
                editingProject: {...state.editingProject, [action.field]: action.payload}
            };
        case FORM_TYPES.CHANGE:
            if (action.meta.form === 'projects') {
                const searchQuery = action.meta.field === 'searchQuery' ? action.payload : null;
                const filteredStatus = action.meta.field === 'filteredStatus' ? action.payload : null;
                const sortBy = action.meta.field === 'sortBy' ? action.payload : null;
                return {
                    ...state,
                    filteredStatus,
                    searchQuery,
                    sortBy
                }
            }
            if (action.meta.form !== 'project') return state;

            if (state.editingProject) {
                const editingProject = {...state.editingProject};
                editingProject[action.meta.field] = action.payload;
                return {
                    ...state,
                    editingProject
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
        case TYPES.OPEN_PROJECT:
            let editingProp = null;
            if (!action.project.about || (action.project.about && action.project.about.length < 3))
                editingProp = {name: 'about', value: action.project.about};
            return {
                ...state,
                openProject: action.project,
                editingProject: null,
                editingProp
            };
        case TYPES.CLOSE_PROJECT:
            return {
                ...state,
                openProject: null,
                editingProject: null
            };
        case TYPES.CHANGE_PROJECT:
            const editingProject = {...state.editingProject, [action.field]: action.payload}
            return {
                ...state,
                editingProject
            };
        case TYPES.UPDATE_PROJECT:
            const updatedProjects = state.projects.map( project => {
                if (project.id === action.id) return { ...action.project};

                return {...project};
            });

            return {
                ...state,
                projects: updatedProjects,
                editingProject: null,
                openProject: state.openProject ? {...action.project} : null
            };
        case TYPES.UPDATE_OPEN_PROJECT:
            let openProject = { ...state.openProject };
            const updatedOpenProjects = state.projects.map( project => {
                if (project.id === state.openproject.id) {
                    openProject = { ...openProject, [action.field]: action.payload};
                    return openProject;
                }

                return {...project};
            });

            return {
                ...state,
                openProject,
                projects: updatedOpenProjects
            };
        case TYPES.REMOVE_PROJECT:
            let index = null;
            state.projects.forEach((project, i) => {
                if (project.id !== action.id) return;

                index = i;
            });
            if (!index) return state;

            if (state.projects.length > 1) {
                return {
                    ...state,
                    projects: [
                        ...state.projects.slice(0, index),
                        ...state.projects.slice(index + 1)
                    ]
                };
            }

            return {
                ...state,
                projects: []
            };
        default:
            return state;
    }
}
