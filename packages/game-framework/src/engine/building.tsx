import {obj2Arr} from "../utils";

export interface Building {
    id: number;
    name: string;
    category: string;
    cost: number[];
    costFactor: number[];
    produces: number[];
    consumes: number[];
    consumesEnergy: number,
    producesEnergy: number
}

let lastBuildingId = -1;
const buildings: Building[] = [];

export function createBuilding(
    name: string,
    category: string,
    costObj: { [id: number]: number },
    costFactorObj: { [id: number]: number },
    producesObj: { [id: number]: number },
    consumesObj: { [id: number]: number },
    consumesEnergy: number,
    producesEnergy: number
): Building {
    const cost = obj2Arr(costObj);
    const costFactor = obj2Arr(costFactorObj);
    const produces = obj2Arr(producesObj);
    const consumes = obj2Arr(consumesObj);
    lastBuildingId += 1;
    buildings[lastBuildingId] = {
        id: lastBuildingId, name, category, cost, costFactor,
        produces, consumes, consumesEnergy, producesEnergy
    };
    return buildings[lastBuildingId];
}

export function getBuilding(id: string | number): Building {
    return buildings[id];
}
