export type Map<T> = { [key: string]: T }

export type Bucket = {
    current: number
    max: number
}

function bucket(current: number, max: number): Bucket {
    return { current, max }
}

export interface Resource {
    name: string
}

export interface Inventory {
    size: number
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

export type GameState = {
    worker: Bucket
    buildings: Building[]
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
    worker: bucket(1, 10),
    buildings: [CarpentryWorkshop]
};
