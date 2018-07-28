export type ResourceCategory = "Resource" | "Research";

export interface ResourceProps {
    name: string;
    category?: ResourceCategory;
}

export interface Resource {
    id: number;
    name: string;
    category: ResourceCategory;
}

let lastItemId = -1;
const resources: Resource[] = [];

export function createResource(props: ResourceProps): Resource {
    lastItemId += 1;
    resources[lastItemId] = {
        id: lastItemId,
        name: props.name,
        category: props.category || "Resource"
    };
    return resources[lastItemId];
}

export function getResource(id: string | number): Resource {
    return resources[id];
}
