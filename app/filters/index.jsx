export const queryFilter = (query) => {
    return (s) => s && query && s.toLowerCase().includes(query.toLowerCase());
}
