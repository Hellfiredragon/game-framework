import {Building, ProductionCluster} from "../state/game-state";
import {removeItems} from "./inventory";

export function addBuilding(productionCluster: ProductionCluster, building: Building): boolean {
    if (!removeItems(productionCluster.resources, building.cost)) return false;

    productionCluster.buildings[building.id] = 1;
    return true;
}
