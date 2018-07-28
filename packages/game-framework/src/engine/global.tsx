import {obj2Arr} from "../utils";
import {Inventory} from "./inventory";

export type Pages = "production-cluster-list" | "production-cluster-view";

export interface GlobalState {
    framesPerSecond: number;
    revenueFactor: number;
    navigation: {
        page: Pages
        id: number
    }
}

export const Defaults: GlobalState = {
    framesPerSecond: 30,
    revenueFactor: 0.5,
    navigation: {
        page: "production-cluster-list",
        id: -1
    }
};

export const Global: GlobalState = {
    ...Defaults,
};

export function configure(state: Partial<GlobalState>) {
    Global.framesPerSecond = state.framesPerSecond || Global.framesPerSecond;
    Global.revenueFactor = state.revenueFactor || Global.revenueFactor;
}
