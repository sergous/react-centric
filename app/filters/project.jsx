import { queryFilter } from "./";

export const projectQueryFilter = (query) => {
    return ({name, category, status, description}) => {
        if (!query) return true;
        return queryFilter(query)(name)
            || queryFilter(query)(category)
            || queryFilter(query)(status)
            || queryFilter(query)(description);
    }
}

export const projectStatusFilter = (filteredStatus) => {
    return ({status}) => {
        if (!filteredStatus) return true;
        if (!status) return false;
        return status.includes(filteredStatus);
    }
}