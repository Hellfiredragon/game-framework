import {Building, ProductionCluster} from "../state/game-state";
import {addItems, removeItems} from "./inventory";

export function addBuilding(productionCluster: ProductionCluster, building: Building): boolean {
    if (!removeItems(productionCluster.resources, building.cost)) return false;

    productionCluster.buildings[building.id] = 1;
    return true;
}

export function removeBuilding(productionCluster: ProductionCluster, building: Building) {
    if (productionCluster.buildings[building.id] === undefined) return false;

    productionCluster.buildings[building.id] = 0;
    addItems(productionCluster.resources, building.cost);
    return true;
}
