import {Global} from "./global";
import {obj2Arr} from "../utils";
import {ProductionCluster} from "./production-cluster";
import {Building} from "./building";
import {removeResources} from "./inventory";

export type ResearchCategory = "Building" | "Ship";
export type AffectedProperty = "ProductionBase" | "ProductionMultiplier" | "CostBase" | "CostMultiplier";

export interface ResearchProps {
    name: string;
    category: ResearchCategory;
    affectedProperty: AffectedProperty;
    cost: { [id: number]: number };
    costFactor: { [id: number]: number };
    explored?: boolean;
    affectedResources?: { [id: number]: number };
    activateResearch?: { [id: number]: number };
    activateBuildings?: { [id: number]: number };
}

export interface Research {
    id: number;
    name: string;
    category: ResearchCategory;
    affectedProperty: AffectedProperty;
    cost: number[];
    costFactor: number[];
    explored: boolean;
    affectedResources: number[];
    activateResearch: number[];
    activateBuildings: number[];
}

export interface GlobalResearch {
    lastResearchId: number;
    researchProjects: Research[];
}

export function createResearch(props: ResearchProps): Research {
    const cost = obj2Arr(props.cost);
    const costFactor = obj2Arr(props.costFactor);
    const activateResearch = obj2Arr(props.activateResearch);
    const affectedResources = obj2Arr(props.affectedResources);
    const activateBuildings = obj2Arr(props.activateBuildings);

    Global.lastResearchId += 1;
    Global.researchProjects[Global.lastResearchId] = {
        id: Global.lastResearchId,
        name: props.name,
        category: props.category,
        affectedProperty: props.affectedProperty,
        cost,
        costFactor,
        explored: props.explored || false,
        activateResearch,
        affectedResources,
        activateBuildings
    };
    return Global.researchProjects[Global.lastResearchId];
}

export function getCost(research: Research, levels: number): number[] {
    const current = Global.researchLevels[research.id] || 0;
    const next = current + levels;
    const cost: number[] = [];
    for (let i in research.cost) {
        let c = 0;
        for (let j = current; j < next; j++) c += Math.pow(research.costFactor[i], j);
        cost[i] = research.cost[i] * c;
    }
    return cost;
}

export function doResearch(research: Research, levels: number) {
    const cost = getCost(research, levels);
    if (!removeResources(Global, cost)) return false;

    research.explored = true;
    Global.researchLevels[research.id] = (Global.researchLevels[research.id] || 0) + levels;

    research.activateResearch.forEach((activationLevel, activationId) => {
        if (Global.researchLevels[research.id] >= activationLevel) {
            Global.researchProjects[activationId].explored = true;
        }
    });
    research.activateBuildings.forEach((activationLevel, activationId) => {
        if (Global.researchLevels[research.id] >= activationLevel) {
            Global.buildingTemplates[activationId].explored = true;
        }
    });
    return true;
}

export function getResearch(id: string | number): Research {
    return Global.researchProjects[id];
}

export function getExploredResearch(): Research[] {
    return Global.researchProjects.filter(x => x.explored);
}
