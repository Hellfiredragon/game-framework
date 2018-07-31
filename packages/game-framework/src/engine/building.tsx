import {obj2Arr} from "../utils";
import {Global} from "./global";

export type BuildingCategory = "Resource" | "Processing" | "Energy" | "Research"

export const BuildingCategories: BuildingCategory[] = ["Resource", "Processing", "Energy", "Research"];

export const BuildingCategorySymbols: { [K in BuildingCategory]: string } = {
    "Resource": "gavel",
    "Processing": "cog",
    "Energy": "bolt",
    "Research": "flask"
};

export interface BuildingProps {
    name: string;
    category?: BuildingCategory;
    cost: { [id: number]: number };
    costFactor: { [id: number]: number };
    costLevel?: { [id: number]: number };
    explored?: boolean;
    produces?: { [id: number]: number };
    consumes?: { [id: number]: number };
    energy?: {
        consumes?: number;
        produces?: number;
    }
}

export interface Building {
    id: number;
    name: string;
    category: BuildingCategory;
    cost: number[];
    costFactor: number[];
    costLevel: number[];
    explored: boolean;
    produces: number[];
    consumes: number[];
    energy: {
        produces: number;
        consumes: number;
    }
}

export interface GlobalBuildings {
    lastBuildingId: number;
    buildingTemplates: Building[];
}

export function createBuilding(props: BuildingProps): Building {
    const cost = obj2Arr(props.cost);
    const costFactor = obj2Arr(props.costFactor);
    const costLevel = obj2Arr(props.costLevel);
    const produces = obj2Arr(props.produces);
    const consumes = obj2Arr(props.consumes);
    Global.lastBuildingId += 1;
    Global.buildingTemplates[Global.lastBuildingId] = {
        id: Global.lastBuildingId,
        name: props.name,
        category: props.category || "Resource",
        cost,
        costFactor,
        costLevel,
        explored: props.explored || false,
        produces,
        consumes,
        energy: {
            produces: props.energy && props.energy.produces ? props.energy.produces : 0,
            consumes: props.energy && props.energy.consumes ? props.energy.consumes : 0
        }
    };
    return Global.buildingTemplates[Global.lastBuildingId];
}

export function getBuilding(id: string | number): Building {
    return Global.buildingTemplates[id];
}

export function getBuildingsByCategory(category: BuildingCategory): Building[] {
    return Global.buildingTemplates.filter(b => b.category == category);
}
