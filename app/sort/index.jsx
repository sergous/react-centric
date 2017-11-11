export function propSort(prop) {
    return (a, b) => {
        return a[prop] > b[prop]
            ? 1
            : -1;
    }
}
