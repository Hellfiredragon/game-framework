import {addItems, Inventory, removeItems} from "./inventory";
import {Building} from "./building";
import {Global} from "./global";

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

export function getRevenue(productionCluster: ProductionCluster, building: Building, levels: number): number[] {
    const current = productionCluster.buildings[building.id] || 0;
    const prev = current - levels;
    const cost: number[] = [];
    for (let i in building.cost) {
        let c = 0;
        for (let j = current - 1; j >= prev; j--) {
            c += Math.pow(building.costFactor[i], j);
        }
        cost[i] = building.cost[i] * c * Global.revenueFactor;
    }
    return cost;
}

export function addBuilding(productionCluster: ProductionCluster, building: Building, levels: number): boolean {
    const cost = getCost(productionCluster, building, levels);
    if (!removeItems(productionCluster.resources, cost)) return false;

    productionCluster.buildings[building.id] = (productionCluster.buildings[building.id] || 0) + levels;
    return true;
}

export function removeBuilding(productionCluster: ProductionCluster, building: Building, levels: number) {
    if (productionCluster.buildings[building.id] === undefined) return;
    if (productionCluster.buildings[building.id] >= levels) {
        const revenue = getRevenue(productionCluster, building, levels);
        productionCluster.buildings[building.id] -= levels;
        addItems(productionCluster.resources, revenue);
    } else {
        productionCluster.buildings[building.id] = productionCluster.buildings[building.id] - levels;
    }
}
