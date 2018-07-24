import {createBuilding, Building} from "./building";
import {Brick, Iron, Stone, Wood} from "./resource.test";
import {Given, Then, When} from "../utils";
import {addBuilding, createProductionCluster} from "./production-cluster";
import {createGameLoop} from "../loop";

export const Lumberjack = createBuilding("Lumberjack", { [Wood.id]: 10 }, { [Wood.id]: 2 }, { [Wood.id]: 1 }, {});
export const StoneWorker = createBuilding("StoneWorker", { [Wood.id]: 10, [Stone.id]: 10 }, { [Wood.id]: 2, [Stone.id]: 3 }, { [Stone.id]: 1 }, {});
export const IronMine = createBuilding("IronMine", { [Stone.id]: 10, [Iron.id]: 20 }, { [Stone.id]: 3, [Iron.id]: 4 }, { [Iron.id]: 1 }, {});

export const Bonfire = createBuilding("Bonfire", {}, {}, {}, { [Wood.id]: 1 });
export const BrickFurnace = createBuilding("BrickFurnace", {}, {}, { [Brick.id]: 1 }, { [Wood.id]: 1, [Stone.id]: 1 });

