import {createBuilding} from "game-framework";
import {Iron} from "./resource";

export const IronMine = createBuilding({
    name: "Iron Mine",
    category: "Resource",
    cost: { [Iron.id]: 10 },
    costFactor: {},
    produces: {},
    consumes: {}
});
