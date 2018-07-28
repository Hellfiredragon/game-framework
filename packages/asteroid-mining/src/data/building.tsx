import {createBuilding} from "game-framework";
import {Iron, IronOre} from "./resource";

export const IronMine = createBuilding({
    name: "Iron Mine",
    category: "Resource",
    cost: { [Iron.id]: 10 },
    costFactor: { [Iron.id]: 1.1 },
    produces: { [IronOre.id]: 1 },
    consumes: {}
});

export const IronBlastFurnace = createBuilding({
    name: "Iron Blast Furnace",
    category: "Processing",
    cost: { [Iron.id]: 10 },
    costFactor: { [Iron.id]: 1.1 },
    produces: { [Iron.id]: 1 },
    consumes: { [IronOre.id]: 1 }
});
