import {obj2Arr} from "../utils";
import {Inventory} from "./inventory";

export interface GlobalState {
    framesPerSecond: number
}

export const Global: GlobalState = {
    framesPerSecond: 30,
};

export function configure() {

}
