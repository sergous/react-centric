export const userFilter = (query) => {
    return ({name}) => {
        if (!query) return true;
        if (!name) return false;
        return name.toLowerCase().includes(query.toLowerCase());
    }
}