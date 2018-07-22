import {createBuilding, Building} from "./building";
import {Iron, Stone, Wood} from "./resource.test";

export const Lumberjack = createBuilding("Lumberjack", { [Wood.id]: 10 }, { [Wood.id]: 2 });
export const StoneWorker = createBuilding("StoneWorker", { [Wood.id]: 10, [Stone.id]: 10 }, { [Wood.id]: 2, [Stone.id]: 3 });
export const IronMine = createBuilding("IronMine", { [Stone.id]: 10, [Iron.id]: 20 }, { [Stone.id]: 3, [Iron.id]: 4 });
