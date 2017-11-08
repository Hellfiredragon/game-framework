
export function replace<T>(array: Array<T>, element: T, newElement: T): Array<T> {
    const index = array.indexOf(element);
    return [...array.splice(0, index), newElement, ...array.splice(index + 1)];
}
