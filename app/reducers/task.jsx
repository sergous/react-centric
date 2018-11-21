import * as TYPES from '../actiontypes'
import { initialState } from '../constants/task'

export default (state = initialState, action) => {
    switch (action.type) {
        case TYPES.REORDER_TASKS:
            return { ...state, tasks: action.payload }
        case TYPES.COLLAPSE_TASKS:
            return { ...state, isCollapsed: action.payload }
        case TYPES.CREATE_TASK:
            return {
                ...state,
                editingTask: { ...action.task },
                editingProp: null,
                isNew: true,
            }
        case TYPES.ADD_TASK:
            return {
                ...state,
                nextId: state.nextId + 1,
                tasks: [...state.tasks, { ...action.task, id: state.nextId }],
                editingTask: null,
                isNew: false,
            }
        case TYPES.EDIT_TASK_PROP:
            return {
                ...state,
                editingTask: {
                    ...state.editingTask,
                    [action.field]: action.payload,
                },
            }
        case TYPES.FORM.CHANGE:
            if (action.meta.form !== 'task') return state

            if (state.editingTask) {
                const editingTask = { ...state.editingTask }
                editingTask[action.meta.field] = action.payload
                return {
                    ...state,
                    editingTask,
                }
            } else if (state.editingProp) {
                let editingProp = { ...state.editingProp }
                if (action.meta.field === editingProp.name)
                    editingProp = { ...editingProp, value: action.payload }
                return {
                    ...state,
                    editingProp,
                }
            }
            return state
        case TYPES.OPEN_TASK:
            return {
                ...state,
                openTask: action.task,
                editingProp: null,
                editingTask: null,
            }
        case TYPES.EDIT_TASK:
            return {
                ...state,
                openTask: null,
                editingProp: null,
                editingTask: action.task,
            }
        case TYPES.CLOSE_TASK:
            return {
                ...state,
                openTask: null,
                editingTask: null,
                isNew: false,
            }
        case TYPES.CHANGE_TASK:
            const editingTask = {
                ...state.editingTask,
                [action.field]: action.payload,
            }
            return {
                ...state,
                editingTask,
            }
        case TYPES.UPDATE_TASK:
            const updatedTasks = state.tasks.map(task => {
                if (task.id === action.id) return { ...action.task }

                return { ...task }
            })

            return {
                ...state,
                tasks: updatedTasks,
                editingTask: null,
                openTask: state.openTask ? { ...action.task } : null,
            }
        case TYPES.UPDATE_OPEN_TASK:
            let openTask = { ...state.openTask }
            const updatedOpenTasks = state.tasks.map(task => {
                if (task.id === state.openTask.id) {
                    openTask = {
                        ...openTask,
                        [action.field]: action.payload,
                    }
                    return openTask
                }

                return { ...task }
            })

            return {
                ...state,
                openTask,
                tasks: updatedOpenTasks,
            }
        case TYPES.REMOVE_TASK:
            let index = null
            state.tasks.forEach((task, i) => {
                if (task.id !== action.id) return

                index = i
            })
            if (!index) return state

            if (state.tasks.length > 1) {
                return {
                    ...state,
                    tasks: [
                        ...state.tasks.slice(0, index),
                        ...state.tasks.slice(index + 1),
                    ],
                    openTask: null,
                    editingTask: null,
                }
            }

            return {
                ...state,
                tasks: [],
            }
        default:
            return state
    }
}
