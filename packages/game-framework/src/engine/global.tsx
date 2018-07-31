import {obj2Arr} from "../utils";
import {Inventory} from "./inventory";
import {Navigation, Pages} from "./navigation";
import {GlobalBuildings} from "./building";
import {GlobalResources} from "./resource";
import {GlobalClusters} from "./production-cluster";
import {GlobalResearch} from "./research";

export interface GlobalState
    extends Inventory,
        GlobalBuildings,
        GlobalResources,
        GlobalClusters,
        GlobalResearch {
    framesPerSecond: number;
    revenueFactor: number;
    navigation: Navigation;
    resources: number[];
    researchLevels: number[];
}

export const Defaults: GlobalState = {
    framesPerSecond: 30,
    revenueFactor: 0.5,
    navigation: {
        main: "production-cluster",
        sub: "overview",
        buildingCategory: "Resource",
        id: 0
    },
    resources: [],
    researchLevels: [],

    lastBuildingId: -1,
    buildingTemplates: [],
    lastResourceId: -1,
    resourceTemplates: [],
    lastClusterId: -1,
    clusters: [],
    lastResearchId: -1,
    researchProjects: []
};

export const Global: GlobalState = {
    ...Defaults,
};

export function configure(state: Partial<GlobalState>) {
    Global.framesPerSecond = state.framesPerSecond || Global.framesPerSecond;
    Global.revenueFactor = state.revenueFactor || Global.revenueFactor;
}
