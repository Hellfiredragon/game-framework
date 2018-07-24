import {obj2Arr} from "../utils";
import {Inventory} from "./inventory";

export interface ConfigureState {
    framesPerSecond?: number;
    revenueFactor?: number;
}

export interface GlobalState {
    framesPerSecond: number;
    revenueFactor: number;
}

export const Defaults: GlobalState = Object.freeze({
    framesPerSecond: 30,
    revenueFactor: 0.5
});

export const Global: GlobalState = { ...Defaults };

export function configure(state: ConfigureState) {
    Global.framesPerSecond = state.framesPerSecond || Global.framesPerSecond;
    Global.revenueFactor = state.revenueFactor || Global.revenueFactor;
}
