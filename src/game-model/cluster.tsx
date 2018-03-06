import {Coal, Iron, ResourceAmount} from "./resources";

let lastId = 0;

const values: Cluster[] = [];

export class Cluster {

    public id: number;

    constructor(public name: string,
                public availableResources: ResourceAmount[]) {
        this.id = lastId++;
        values[this.id] = this;
    }

}

export const Earth = new Cluster("Earth", [
    { key: Iron, value: 1 },
    { key: Coal, value: 1 }
]);

export const Moon = new Cluster("Moon", [
    { key: Iron, value: 2 },
    { key: Coal, value: 0.5 }
]);

export function getProductionCluster(id: number): Cluster {
    return values[id];
}
