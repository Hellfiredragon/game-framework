import {observable} from "mobx";
import {DEBUG, STORAGE_KEY} from "./constants";

let state = observable({
    test: 1
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
    if (data == null) return;
    try {
        if (DEBUG) {
            state = observable(JSON.parse(data));
        } else {
            state = observable(JSON.parse(atob(data)));
        }
    } catch {
        console.error("Game data broken!");
    }
}

export const GameState = () => state;

load();
