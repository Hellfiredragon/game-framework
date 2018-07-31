import {Global} from "./global";

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

export interface GlobalResources {
    lastResourceId: number;
    resources: Resource[];
}

export function createResource(props: ResourceProps): Resource {
    Global.lastResourceId += 1;
    Global.resources[Global.lastResourceId] = {
        id: Global.lastResourceId,
        name: props.name,
        category: props.category || "Resource"
    };
    return Global.resources[Global.lastResourceId];
}

export function getResource(id: string | number): Resource {
    return Global.resources[id];
}
