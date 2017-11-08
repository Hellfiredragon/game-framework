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
    name: string
    products: Product[]
    hiddenProducts: Product[]

}

export enum GameStages {
    SelectStartBuilding,
    Main
}

export type GameState = {
    stage: GameStages
    worker: Bucket
    buildings: Building[]
    inventory: Inventory
};

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

const Forest: Building = {
    name: "Forest",
    products: [SpruceWood],
    hiddenProducts: [OakWood]
};

const CarpentryWorkshop: Building = {
    name: "Caprentry Workshop",
    products: [SimpleTable],
    hiddenProducts: []
};

export const InitialGameState: GameState = {
    stage: GameStages.SelectStartBuilding,
    worker: bucket(10, 10),
    buildings: [Forest, CarpentryWorkshop],
    inventory: {
        values: {}
    }
};
