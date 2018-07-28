import {obj2Arr} from "../utils";

export interface BuildingProps {
    name: string;
    category: string;
    cost: { [id: number]: number };
    costFactor: { [id: number]: number };
    produces?: { [id: number]: number };
    consumes?: { [id: number]: number };
    energy?: {
        consumes?: number;
        produces?: number;
    }
}

export interface Building {
    id: number;
    name: string;
    category: string;
    cost: number[];
    costFactor: number[];
    produces: number[];
    consumes: number[];
    energy: {
        produces: number;
        consumes: number;
    }
}

let lastBuildingId = -1;
const buildings: Building[] = [];

export function createBuilding(props: BuildingProps): Building {
    const cost = obj2Arr(props.cost);
    const costFactor = obj2Arr(props.costFactor);
    const produces = obj2Arr(props.produces);
    const consumes = obj2Arr(props.consumes);
    lastBuildingId += 1;
    buildings[lastBuildingId] = {
        id: lastBuildingId,
        name: props.name,
        category: props.category,
        cost, costFactor,
        produces, consumes,
        energy: {
            produces: props.energy && props.energy.produces ? props.energy.produces : 0,
            consumes: props.energy && props.energy.consumes ? props.energy.consumes : 0
        }
    };
    return buildings[lastBuildingId];
}

export function getBuilding(id: string | number): Building {
    return buildings[id];
}
