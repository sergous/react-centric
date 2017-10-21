import {users} from './user';
export const PROJECT_STATUS = {
    ACTIVE      : 'active',
    PAUSED      : 'paused',
    DELAYED     : 'delayed',
    CHANCELED   : 'chanceled',
    COMPLETED   : 'completed',
}

export const PROGRESS_STYLE = {
    SUCCESS     : 'success',
    INFO        : 'info',
    WARNING     : 'warning',
    DANGER      : 'danger',
}

export const mapStatusToStyle = {
    [PROJECT_STATUS.ACTIVE]     : PROGRESS_STYLE.INFO,
    [PROJECT_STATUS.PAUSED]     : PROGRESS_STYLE.WARNING,
    [PROJECT_STATUS.DELAYED]    : PROGRESS_STYLE.DANGER,
    [PROJECT_STATUS.CHANCELED]  : PROGRESS_STYLE.INFO,
    [PROJECT_STATUS.COMPLETED]  : PROGRESS_STYLE.SUCCESS,
}

const projects = [
    {
        id: 1,
        name: 'Project A',
        status: PROJECT_STATUS.ACTIVE,
        description: 'Ut turpis urna, tristique sed adipiscing nec, luctus quis leo. Fusce nec volutpat ante.',
        category: 'Web development',
        progress: 56,
        members: users,
        stats: {
            issues: 156,
            tests: 32,
            posts: 5,
        }
    }
]

export const initialState = {
    projects,
    nextId: 3,
    openProject: null,
    editingProject: null,
    editingProp: null,
    isNew: false,
    searchQuery: null
};