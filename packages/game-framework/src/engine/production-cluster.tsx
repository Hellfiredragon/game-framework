import {addResources, Inventory, removeResources} from "./inventory";
import {Building, getBuilding} from "./building";
import {Global} from "./global";
import {obj2Arr} from "../utils";
import {MS_PER_UPDATE, S_PER_UPDATE} from "./constants";

export interface ProductionClusterProps {
    name: string,
    explored?: boolean,
    resources?: { [id: number]: number }
    buildings?: { [id: number]: number }
}

export interface ProductionCluster extends Inventory {
    id: number;
    name: string;
    explored: boolean
    buildings: number[];
    resources: number[];
}

let lastProductionClusterId = -1;
const productionClusters: ProductionCluster[] = [];

export function createProductionCluster(props: ProductionClusterProps): ProductionCluster {
    const resources = obj2Arr(props.resources);
    const buildings = obj2Arr(props.buildings);

    lastProductionClusterId += 1;
    productionClusters[lastProductionClusterId] = {
        id: lastProductionClusterId,
        name: props.name,
        explored: props.explored || false,
        resources,
        buildings
    };
    return productionClusters[lastProductionClusterId];
}

export function getProductionCluster(id: string | number): ProductionCluster {
    return productionClusters[id];
}

export function getExploredProductionCluster(): ProductionCluster[] {
    return productionClusters.filter(p => p.explored)
}

export function updateAllProductionCluster() {
    productionClusters.forEach(updateCluster);
}

export function getCost(productionCluster: ProductionCluster, building: Building, levels: number): number[] {
    const current = productionCluster.buildings[building.id] || 0;
    const next = current + levels;
    const cost: number[] = [];
    for (let i in building.cost) {
        let c = 0;
        for (let j = current; j < next; j++) {
            if (building.costLevel[i]) {
                if (j < building.costLevel[i] - 1) continue;
                c += Math.pow(building.costFactor[i], j - building.costLevel[i] + 1);
            } else {
                c += Math.pow(building.costFactor[i], j);
            }
        }
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

export function getEnergyProduction(cluster: ProductionCluster): number {
    let energyProduction = 0;
    cluster.buildings.forEach((level, buildingId) => {
        const building = getBuilding(buildingId);
        if (building.energy.produces) {
            let enough = true;
            building.consumes.forEach((amount, resourceId) => {
                const consumed = amount * level * S_PER_UPDATE;
                if (cluster.resources[resourceId] < consumed) enough = false;
            });
            if (enough) energyProduction += building.energy.produces * level;
        }
    });
    return energyProduction;
}

export function getEnergyConsumption(cluster: ProductionCluster) {
    let energyConsumption = 0;
    cluster.buildings.forEach((level, buildingId) => {
        const building = getBuilding(buildingId);
        energyConsumption += building.energy.consumes * level;
    });
    return energyConsumption;
}

export function getEnergyProductionFactor(production: number, consumption: number): number {
    if(consumption == 0) return 1;
    const percent = production / consumption;
    if (isNaN(percent)) return 0;
    if (percent >= 1) return 1;
    const result = percent - (1 - percent);
    if (result < 0) return 0;
    return result;
}

export function calcProduction(productionCluster: ProductionCluster): number[] {
    const energyProductionFactor = getEnergyProductionFactor(getEnergyProduction(productionCluster), getEnergyConsumption(productionCluster));
    const production: number[] = [];
    productionCluster.buildings.forEach((level, buildingId) => {
        const building = getBuilding(buildingId);
        let enough = true;
        building.consumes.forEach((amount, resourceId) => {
            const consumed = amount * level * (building.energy.consumes > 0 ? energyProductionFactor : 1);
            if (productionCluster.resources[resourceId] < consumed) enough = false;
        });
        if (enough) {
            building.produces.forEach((amount, resourceId) => {
                production[resourceId] = (production[resourceId] || 0) + amount * level * (building.energy.consumes > 0 ? energyProductionFactor : 1);
            });
            building.consumes.forEach((amount, resourceId) => {
                production[resourceId] = (production[resourceId] || 0) - amount * level * (building.energy.consumes > 0 ? energyProductionFactor : 1);
            });
        }
    });
    return production;
}

export function updateCluster(productionCluster: ProductionCluster) {
    const production = calcProduction(productionCluster);
    production.forEach((amount, resourceId) => {
        productionCluster.resources[resourceId] = (productionCluster.resources[resourceId] || 0) + amount * S_PER_UPDATE;
    });
}
