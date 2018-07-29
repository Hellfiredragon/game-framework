import {createBuilding} from "game-framework";
import {Iron, IronOre, RP} from "./resource";

export const IronMine = createBuilding({
    name: "Iron Mine",
    cost: { [Iron.id]: 100 },
    costFactor: { [Iron.id]: 1.1 },
    produces: { [IronOre.id]: 1 },
    consumes: {}
});

export const Quarry = createBuilding({
    name: "Quarry",
    cost: { [Iron.id]: 100 },
    costFactor: { [Iron.id]: 10 },
    produces: {}
});

export const IronBlastFurnace = createBuilding({
    name: "Iron Blast Furnace",
    category: "Processing",
    cost: { [Iron.id]: 10 },
    costFactor: { [Iron.id]: 1.1 },
    produces: { [Iron.id]: 1 },
    consumes: { [IronOre.id]: 1 }
});
