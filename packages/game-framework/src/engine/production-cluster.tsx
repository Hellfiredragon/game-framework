import {addItems, Inventory, removeItems} from "./inventory";
import {Building} from "./building";

export interface ProductionCluster {
    resources: Inventory;
    buildings: number[];
}

export function getCost(productionCluster: ProductionCluster, building: Building, levels: number): number[] {
    const current = productionCluster.buildings[building.id] || 0;
    const next = current + levels;
    const cost: number[] = [];
    for (let i in building.cost) {
        let c = 0;
        for (let j = current; j < next; j++) c += Math.pow(building.costFactor[i], j);
        cost[i] = building.cost[i] * c;
    }
    return cost;
}

export function addBuilding(productionCluster: ProductionCluster, building: Building, levels: number): boolean {
    const cost = getCost(productionCluster, building, levels);
    if (!removeItems(productionCluster.resources, cost)) return false;

    productionCluster.buildings[building.id] = (productionCluster.buildings[building.id] || 0) + levels;
    return true;
}

export function removeBuilding(productionCluster: ProductionCluster, building: Building) {
    if (productionCluster.buildings[building.id] === undefined) return false;

    productionCluster.buildings[building.id] = 0;
    addItems(productionCluster.resources, building.cost);
    return true;
}
