const initialState = {
    isCollapsed: true,
    tasks: [
        { id: 1, name: 'Task 1', description: 'Very nice first task' },
        {
            id: 2,
            name: 'Complex task',
            description: 'Second task with nested subtasks',
            children: [
                { id: 3, name: 'Prepare', description: 'Prepare for action' },
                { id: 4, name: 'Act now', description: 'Do it right now' },
                { id: 5, name: 'Get results', description: 'Do it right now' },
            ],
        },
    ],
};
export { initialState };
