import {obj2Arr} from "../utils";

export interface Building {
    id: number;
    name: string;
    cost: number[];
    costFactor: number[];
}

let lastBuildingId = -1;
const buildings: Building[] = [];

export function createBuilding(name: string, costObj: { [id: number]: number }, costFactorObj: { [id: number]: number }): Building {
    const cost = obj2Arr(costObj);
    const costFactor = obj2Arr(costFactorObj);
    lastBuildingId += 1;
    buildings[lastBuildingId] = { id: lastBuildingId, name, cost, costFactor };
    return buildings[lastBuildingId];
}

export function getBuilding(id: string | number): Building {
    return buildings[id];
}
