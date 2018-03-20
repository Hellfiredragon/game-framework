import {Coal, Cost, Iron, ResourceAmount, Steel} from "./resources";

let lastId = 0;

const values: Building[] = [];

export class Building {

    public id: number;

    constructor(public name: string,
                public group: string,
                public energy: number,
                public consumes: ResourceAmount[],
                public produces: ResourceAmount[],
                public cost: Cost[]) {
        this.id = lastId++;
        values[this.id] = this;
    }

}

export const ENERGY_GROUP = "Energy";
export const RESOURCE_GROUP = "Resource";
export const PRODUCTION_GROUP = "Production";

export const Groups = [ENERGY_GROUP, RESOURCE_GROUP, PRODUCTION_GROUP];

export const SolarPowerPlant = new Building("Solar Power Plant", ENERGY_GROUP, 10, [], [], [
    { key: Iron, value: 10, increase: 1.1 }
]);

export const IronMine = new Building("Iron Mine", RESOURCE_GROUP, -10, [], [
    { key: Iron, value: 1 }
], [
    { key: Iron, value: 10, increase: 1.1 }
]);

export const CoalMine = new Building("Coal Mine", RESOURCE_GROUP, -10, [], [
    { key: Coal, value: 1 }
], [
    { key: Iron, value: 10, increase: 1.1 }
]);

export const Foundry = new Building("Foundry", PRODUCTION_GROUP, -100, [
    { key: Iron, value: 10 },
    { key: Coal, value: 10 }
], [
    { key: Steel, value: 1 }
], [
    { key: Iron, value: 1000, increase: 1.2 },
    { key: Steel, value: 1 / Math.pow(1.2, 10), increase: 1.2 } // got after 10 level above 1 bye increasing from 1.2
]);

