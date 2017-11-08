export type Dict<T> = { [key: string]: T }

export type Bucket = {
    current: number
    max: number
}

function bucket(current: number, max: number): Bucket {
    return { current, max }
}

export interface Product {
    id: number
    name: string
    consumes: number[]
    produces: number
    time: Bucket
    value: number
    worker: number
}

export const AllProducts: Product[] = [];

function levelToValue(level: number): number {
    return 10 * Math.pow(3, level - 1);
}

function product(name: string, consumes: Dict<number>, level: number, produces: number = 1): Product {
    const id = AllProducts.length;
    const consumeArray: number[] = [];
    Object.keys(consumes).forEach(id => consumeArray[id as any] = consumes[id]);
    const baseValue = levelToValue(level);
    let endValue = baseValue;
    consumeArray.forEach((count, productId) => {
        endValue += count * AllProducts[productId].value
    });
    endValue /= produces;
    const result: Product = {
        id: id,
        name: name,
        consumes: consumeArray,
        produces: produces,
        time: bucket(0, baseValue),
        value: endValue,
        worker: 0
    };
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
    sales: number[] // productId
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
        routes: [],
        sales: []
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
    seller: Bucket
    buildings: Building[]
    buildableBuildings: Building[]
    hiddenBuildings: Building[]
    start: StartingGroup[]
}

/** -------------------------------------------------------------- **/
/** Base resources **/
/** -------------------------------------------------------------- **/
const SpruceTrunk = product(
    "Spruce Trunk",
    {},
    1
);

const OakTrunk = product(
    "Oak Trunk",
    {},
    3
);

/** -------------------------------------------------------------- **/
/** Products **/
/** -------------------------------------------------------------- **/
const SpruceWood = product(
    "Spruce Wood",
    {
        [SpruceTrunk.id]: 1
    },
    2,
    5
);

const SimpleTable = product(
    "Simple Table",
    {
        [SpruceWood.id]: 3
    },
    3
);

/** -------------------------------------------------------------- **/
/** Resource buildings **/
/** -------------------------------------------------------------- **/
const Forest = building(
    10000,
    "Forest",
    [SpruceTrunk],
    [OakTrunk]
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
    [SpruceWood, SimpleTable],
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
    seller: bucket(10, 10),
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
