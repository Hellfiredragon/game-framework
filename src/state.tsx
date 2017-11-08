export type Map<T> = { [key: string]: T }

export type Bucket = {
    current: number
    max: number
}

function bucket(current: number, max: number): Bucket {
    return { current, max }
}

export interface Inventory {
    values: Map<number>
}

export interface Product {
    name: string
    consumes: Map<number>
    time: Bucket
    worker: number
}

export interface Building {
    cost: number,
    name: string
    products: Product[]
    hiddenProducts: Product[]

}

export enum GameStages {
    SelectStartBuilding,
    Main
}

export interface StartingGroup {
    resources: Building[],
    building: Building
}

export interface GameState {
    gold: number
    stage: GameStages
    worker: Bucket
    buildings: Building[]
    buildableBuildings: Building[]
    hiddenBuildings: Building[]
    inventory: Inventory
    start: StartingGroup[]
}

/** -------------------------------------------------------------- **/
/** Base resources **/
/** -------------------------------------------------------------- **/
const SpruceWood: Product = {
    name: "Spruce Wood",
    consumes: {},
    time: bucket(0, 10),
    worker: 0
};

const OakWood: Product = {
    name: "Oak Wood",
    consumes: {},
    time: bucket(0, 100),
    worker: 0
};

const SimpleTable: Product = {
    name: "Simple Table",
    consumes: {
        [SpruceWood.name]: 3
    },
    time: bucket(0, 30),
    worker: 0
};

/** -------------------------------------------------------------- **/
/** Resource buildings **/
/** -------------------------------------------------------------- **/
const Forest: Building = {
    cost: 10000,
    name: "Forest",
    products: [SpruceWood],
    hiddenProducts: [OakWood]
};

const CoalMine: Building = {
    cost: 5000,
    name: "Coal Mine",
    products: [],
    hiddenProducts: []
};

const OreMine: Building = {
    cost: 5000,
    name: "Ore Mine",
    products: [],
    hiddenProducts: []
};

/** -------------------------------------------------------------- **/
/** Base production buildings **/
/** -------------------------------------------------------------- **/
const CarpentryWorkshop: Building = {
    cost: 10000,
    name: "Caprentry Workshop",
    products: [SimpleTable],
    hiddenProducts: []
};

const Forge: Building = {
    cost: 10000,
    name: "Forge",
    products: [],
    hiddenProducts: []
};

const Tavern: Building = {
    cost: 20000,
    name: "Tavern",
    products: [],
    hiddenProducts: []
};

export const InitialGameState: GameState = {
    gold: 22000,
    stage: GameStages.SelectStartBuilding,
    worker: bucket(10, 10),
    buildings: [],
    buildableBuildings: [
        Forest, CoalMine, OreMine,
        CarpentryWorkshop, Forge, Tavern
    ],
    hiddenBuildings: [],
    inventory: {
        values: {}
    },
    start: [
        { resources: [Forest], building: CarpentryWorkshop },
        { resources: [CoalMine, OreMine], building: Forge },
        { resources: [], building: Tavern }
    ]
};
