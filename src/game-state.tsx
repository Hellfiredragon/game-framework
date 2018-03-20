import {observable} from "mobx";
import {DEBUG, STORAGE_KEY} from "./constants";
import {Earth, Moon} from "./game-model/cluster";
import {Iron} from "./game-model/resources";
import {CoalMine, Foundry, IronMine, SolarPowerPlant} from "./game-model/buildings";

export interface _GameState {
    lastSaved: number
    boostSec: number
    boostActive: boolean
    unlockedClusters: boolean[]
    clusterResources: number[][] // clusterId, resourceId
    unlockedBuildings: boolean[]
}

function startOwnedClusters(): boolean[] {
    const data: boolean[] = [];
    data[Earth.id] = true;
    data[Moon.id] = true;
    return data;
}

function startClusterResources(): number[][] {
    const data: number[][] = [];
    data[Earth.id] = [];
    data[Earth.id][Iron.id] = 100;
    data[Moon.id] = [];
    return data;
}

function startUnlockedBuildings(): boolean[] {
    const data: boolean[] = [];
    data[SolarPowerPlant.id] = true;
    data[IronMine.id] = true;
    data[CoalMine.id] = false;
    data[Foundry.id] = false;
    return data;
}

let state: _GameState = observable({
    lastSaved: Date.now(),
    boostSec: 0,
    boostActive: false,
    unlockedClusters: startOwnedClusters(),
    clusterResources: startClusterResources(),
    unlockedBuildings: startUnlockedBuildings()
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
    } catch(e) {
        console.error("Game data broken!");
    }

    state = observable(Object.assign(state, loaded));

    state.boostSec += (Date.now() - state.lastSaved) / 1000;
    state.boostActive = false;
}

export const GameState = () => state;

// load();
