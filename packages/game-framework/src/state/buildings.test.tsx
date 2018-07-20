import {createBuilding, Building} from "./game-state";
import {Iron, Stone, Wood} from "./items.test";

export const Lumberjack = createBuilding("Lumberjack", { [Wood.id]: 10 });
export const StoneWorker = createBuilding("StoneWorker", { [Wood.id]: 10, [Stone.id]: 10 });
export const IronMine = createBuilding("IronMine", { [Stone.id]: 10, [Iron.id]: 20 });
