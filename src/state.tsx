export type Dict<T> = { [key: string]: T }

export type Bucket = {
    current: number
    max: number
}

function bucket(current: number, max: number): Bucket {
    return { current, max }
}

export interface Product {
    id: number,
    name: string
    consumes: number[];
    time: Bucket
    worker: number
}

export const AllProducts: Product[] = [];

function product(name: string, consumes: Dict<number>, time: Bucket): Product {
    const id = AllProducts.length;
    const result: Product = {
        id: id,
        name: name,
        consumes: [],
        time: time,
        worker: 0
    };
    Object.keys(consumes).forEach(id => result.consumes[id as any] = consumes[id]);
    AllProducts.push(result);
    return result;
}

export interface Building {
    id: number,
    cost: number,
    name: string
    products: Product[]
    hiddenProducts: Product[]
    inventory: number[] // productId
    routes: number[][] // targetId -> productId
}

export const AllBuildings: Building[] = [];

function building(cost: number, name: string, products: Product[], hiddenProducts: Product[]): Building {
    const id = AllBuildings.length;
    const result: Building = {
        id: id,
        cost: cost,
        name: name,
        products: products,
        hiddenProducts: hiddenProducts,
        inventory: [],
        routes: []
    };
    AllBuildings.push(result);
    return result;
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
    carts: Bucket
    buildings: Building[]
    buildableBuildings: Building[]
    hiddenBuildings: Building[]
    start: StartingGroup[]
}

/** -------------------------------------------------------------- **/
/** Base resources **/
/** -------------------------------------------------------------- **/
const SpruceWood = product(
    "Spruce Wood",
    {},
    bucket(0, 10)
);

const OakWood = product(
    "Oak Wood",
    {},
    bucket(0, 100)
);

const SimpleTable = product(
    "Simple Table",
    {
        [SpruceWood.name]: 3
    },
    bucket(0, 30)
);

/** -------------------------------------------------------------- **/
/** Resource buildings **/
/** -------------------------------------------------------------- **/
const Forest = building(
    10000,
    "Forest",
    [SpruceWood],
    [OakWood]
);

const CoalMine = building(
    5000,
    "Coal Mine",
    [],
    []
);

const OreMine = building(
    5000,
    "Ore Mine",
    [],
    []
);

/** -------------------------------------------------------------- **/
/** Base production buildings **/
/** -------------------------------------------------------------- **/
const CarpentryWorkshop = building(
    10000,
    "Caprentry Workshop",
    [SimpleTable],
    []
);

const Forge = building(
    10000,
    "Forge",
    [],
    []
);

const Tavern = building(
    20000,
    "Tavern",
    [],
    []
);

export const InitialGameState: GameState = {
    gold: 22000,
    stage: GameStages.SelectStartBuilding,
    worker: bucket(10, 10),
    carts: bucket(10, 10),
    buildings: [],
    buildableBuildings: [
        Forest, CoalMine, OreMine,
        CarpentryWorkshop, Forge, Tavern
    ],
    hiddenBuildings: [],
    start: [
        { resources: [Forest], building: CarpentryWorkshop },
        { resources: [CoalMine, OreMine], building: Forge },
        { resources: [], building: Tavern }
    ]
};
