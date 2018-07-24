import {addResources, Inventory, removeResources} from "./inventory";
import {Building, getBuilding} from "./building";
import {Global} from "./global";
import {obj2Arr} from "../utils";

export interface ProductionCluster extends Inventory {
    id: number;
    name: string;
    buildings: number[];
}

let lastProductionClusterId = -1;
const productionClusters: ProductionCluster[] = [];

export function createProductionCluster(name: string): ProductionCluster {
    lastProductionClusterId += 1;
    productionClusters[lastProductionClusterId] = { id: lastProductionClusterId, name, resources: [], buildings: [] };
    return productionClusters[lastProductionClusterId];
}

export function getProductionCluster(id: string | number): ProductionCluster {
    return productionClusters[id];
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
    const prev = (current - levels) >= 0 ? current - levels : 0;
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
    if (levels <= 0) return false;
    const cost = getCost(productionCluster, building, levels);
    if (!removeResources(productionCluster, cost)) return false;

    productionCluster.buildings[building.id] = (productionCluster.buildings[building.id] || 0) + levels;
    return true;
}

export function removeBuilding(productionCluster: ProductionCluster, building: Building, levels: number) {
    if (levels <= 0) return;
    if (productionCluster.buildings[building.id] === undefined) return;
    if (productionCluster.buildings[building.id] < levels) {
        const revenue = getRevenue(productionCluster, building, levels);
        productionCluster.buildings[building.id] = 0;
        addResources(productionCluster, revenue);
    } else {
        const revenue = getRevenue(productionCluster, building, levels);
        productionCluster.buildings[building.id] = productionCluster.buildings[building.id] - levels;
        addResources(productionCluster, revenue);
    }
}

export function updateCluster(productionCluster: ProductionCluster, time: number) {
    productionCluster.buildings.forEach((level, buildingId) => {
        const building = getBuilding(buildingId);
        building.produces.forEach((amount, resourceId) => {
            const produced = amount * level * time;
            productionCluster.resources[resourceId] = (productionCluster.resources[resourceId] || 0) + produced;
        });
    });
}
