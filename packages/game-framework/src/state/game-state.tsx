import {obj2Arr} from "../utils";

export interface INavigation {
    page: string;
}

export interface IGameState {
    framesPerSecond: number
    nav: INavigation
}

export interface Item {
    id: number;
    name: string;
}

let lastItemId = -1;
const items: Item[] = [];

export function createItem(name: string): Item {
    lastItemId += 1;
    items[lastItemId] = { id: lastItemId, name };
    return items[lastItemId];
}

export function getItem(id: string | number): Item {
    return items[id];
}

export interface Inventory {
    items: number[];
}

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

export interface ProductionCluster {
    resources: Inventory;
    buildings: number[];
}

export const GameState: IGameState = {
    framesPerSecond: 30,
    nav: {
        page: "buildings"
    }
};
