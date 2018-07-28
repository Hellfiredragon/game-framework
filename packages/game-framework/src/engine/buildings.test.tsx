import {createBuilding, Building} from "./building";
import {Brick, Coal, Hydrogen, Iron, ResearchPoints, Stone, Wood} from "./resource.test";
import {Given, Then, When} from "../utils";
import {addBuilding, createProductionCluster} from "./production-cluster";
import {createGameLoop} from "../loop";

export const Lumberjack = createBuilding({
    name: "Lumberjack",
    cost: {
        [Wood.id]: 10
    },
    costFactor: {
        [Wood.id]: 2
    },
    produces: {
        [Wood.id]: 1
    }
});

export const StoneWorker = createBuilding({
    name: "Stone Worker",
    cost: {
        [Wood.id]: 10, [Stone.id]: 10
    }, costFactor: {
        [Wood.id]: 2,
        [Stone.id]: 3
    }, produces: {
        [Stone.id]: 1
    }
});

export const IronMine = createBuilding({
    name: "Iron Mine",
    cost: {
        [Stone.id]: 10,
        [Iron.id]: 20
    }, costFactor: {
        [Stone.id]: 3,
        [Iron.id]: 4
    }, produces: {
        [Iron.id]: 1
    }
});

export const CoalMine = createBuilding({
    name: "Coal Mine",
    cost: {},
    costFactor: {},
    produces: {
        [Coal.id]: 1
    }
});

export const Bonfire = createBuilding({
    name: "Bonfire",
    category: "Energy",
    cost: {},
    costFactor: {},
    consumes: {
        [Wood.id]: 1
    },
    energy: {
        produces: 1
    }
});

export const BrickFurnace = createBuilding({
    name: "BrickFurnace",
    category: "Processing",
    cost: {},
    costFactor: {},
    produces: {
        [Brick.id]: 1
    },
    consumes: {
        [Wood.id]: 1,
        [Stone.id]: 1
    }
});

export const HydrogenKatalysator = createBuilding({
    name: "Hydrogen Catalysator",
    cost: {},
    costFactor: {},
    produces: {
        [Hydrogen.id]: 2
    },
    energy: {
        consumes: 50
    }
});

export const FuelCell = createBuilding({
    name: "Fuel Cell",
    category: "Energy",
    cost: {},
    costFactor: {},
    consumes: {
        [Hydrogen.id]: 1
    },
    energy: {
        produces: 100
    }
});

export const PowerPlant = createBuilding({
    name: "Power Plant",
    category: "Energy",
    cost: {},
    costFactor: {},
    consumes: {
        [Coal.id]: 1
    },
    energy: {
        produces: 100
    }
});

export const Lab = createBuilding({
    name: "Lab",
    category: "Research",
    cost: {},
    costFactor: {},
    produces: {
        [ResearchPoints.id]: 100
    },
    energy: {
        consumes: 100
    }
});
