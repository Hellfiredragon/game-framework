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
    resourceTemplates: Resource[];
}

export function createResource(props: ResourceProps): Resource {
    Global.lastResourceId += 1;
    Global.resourceTemplates[Global.lastResourceId] = {
        id: Global.lastResourceId,
        name: props.name,
        category: props.category || "Resource"
    };
    return Global.resourceTemplates[Global.lastResourceId];
}

export function getResource(id: string | number): Resource {
    return Global.resourceTemplates[id];
}

export function getResourceProduction(id: string | number, base: number, level: number) {
    return base * level;
}
