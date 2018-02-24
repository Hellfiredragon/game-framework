import {observable} from "mobx";
import {DEBUG, STORAGE_KEY} from "./constants";

let state = observable({
    lastSaved: Date.now(),
    boostSec: 0,
    boostActive: false,
    test: 1,

    selectedTab: 0


});

export function save() {
    if (DEBUG) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
        localStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(state)));
    }
}

export function load() {
    let data = localStorage.getItem(STORAGE_KEY);
    let loaded: any = null;
    if (data == null) return;
    try {
        if (DEBUG) {
            loaded = JSON.parse(data);
        } else {
            loaded = JSON.parse(atob(data));
        }
    } catch {
        console.error("Game data broken!");
    }

    state = observable(Object.assign(state, loaded));

    state.boostSec += (Date.now() - state.lastSaved) / 1000;
    state.boostActive = false;
}

export const GameState = () => state;

load();
