export const userFilter = (query = '') => {
    return (user) => {
        const {name = ''} = user;
        return name.toLowerCase().includes(query.toLowerCase());
    }
}