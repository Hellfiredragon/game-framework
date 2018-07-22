import {obj2Arr} from "../utils";
import {Inventory} from "./inventory";

export interface ConfigureState {
    framesPerSecond?: number;
    saleFactor?: number;
}

export interface GlobalState {
    framesPerSecond: number;
    saleFactor: number;
}

export const Global: GlobalState = {
    framesPerSecond: 30,
    saleFactor: 0.5
};

export function configure(state: ConfigureState) {
    Global.framesPerSecond = state.framesPerSecond || Global.framesPerSecond;
    Global.saleFactor = state.saleFactor || Global.saleFactor;
}
