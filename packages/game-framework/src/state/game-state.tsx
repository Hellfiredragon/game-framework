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

export const GameState: IGameState = {
    framesPerSecond: 30,
    nav: {
        page: "buildings"
    }
};
