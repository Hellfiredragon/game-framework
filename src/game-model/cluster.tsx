import {Coal, Iron, ResourceAmount} from "./resources";
import {Building, CoalMine, Foundry, IronMine, SolarPowerPlant} from "./buildings";

let lastId = 0;

const values: Cluster[] = [];

export class Cluster {

    public id: number;

    constructor(public name: string,
                public availableResources: ResourceAmount[],
                public buildings: Building[]) {
        this.id = lastId++;
        values[this.id] = this;
    }

}

export const Earth = new Cluster("Earth", [
    { key: Iron, value: 1 },
    { key: Coal, value: 1 }
], [SolarPowerPlant, IronMine, CoalMine, Foundry]);

export const Moon = new Cluster("Moon", [
    { key: Iron, value: 2 },
    { key: Coal, value: 0.5 }
], [SolarPowerPlant, IronMine, Foundry]);

export function getProductionCluster(id: number): Cluster {
    return values[id];
}
