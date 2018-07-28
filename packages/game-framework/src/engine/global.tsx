import {obj2Arr} from "../utils";
import {Inventory} from "./inventory";
import {Navigation, Pages} from "./navigation";

export interface GlobalState {
    framesPerSecond: number;
    revenueFactor: number;
    navigation: Navigation
}

export const Defaults: GlobalState = {
    framesPerSecond: 30,
    revenueFactor: 0.5,
    navigation: {
        main: "production-cluster",
        sub: "overview",
        buildingCategory: "Resource",
        id: 0
    }
};

export const Global: GlobalState = {
    ...Defaults,
};

export function configure(state: Partial<GlobalState>) {
    Global.framesPerSecond = state.framesPerSecond || Global.framesPerSecond;
    Global.revenueFactor = state.revenueFactor || Global.revenueFactor;
}
