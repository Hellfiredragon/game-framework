export interface ResourceProps {
    name: string;
}

export interface Resource {
    id: number;
    name: string;
}

let lastItemId = -1;
const items: Resource[] = [];

export function createResource(props: ResourceProps): Resource {
    lastItemId += 1;
    items[lastItemId] = {
        id: lastItemId,
        name: props.name
    };
    return items[lastItemId];
}

export function getResource(id: string | number): Resource {
    return items[id];
}
