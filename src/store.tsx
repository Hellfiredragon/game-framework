import {GameState, InitialGameState} from "./state";

const LOCAL_STORAGE_KEY = "game-state";

const reset = !!location.search.split("&").find(key => key.split("=")[0] == "reset");

export interface RootState {
    game: GameState
}

const InitialState: RootState = {
    game: InitialGameState
};

function loadStorage(): RootState {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            return InitialState
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error(err);
        return InitialState
    }
}

export function saveStorage() {
    try {
        const serializedState = JSON.stringify(Store);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (err) {
        console.error(err);
    }
}

export function resetStorage() {
    try {
        Store.game = InitialGameState;
        saveStorage();
    } catch (err) {
        console.error(err);
    }
}

export const Store = reset ? InitialState : loadStorage();
