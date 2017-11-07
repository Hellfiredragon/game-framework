import {combineReducers, createStore, Store} from "redux";
import {GameActions} from "./actions";
import {GameState, InitialGameState} from "./state";
import {gameReducer} from "./reducer";

const LOCAL_STORAGE_KEY = "game-state";

export type RootAction =
    | GameActions[keyof GameActions]

export interface RootState {
    game: GameState
}

const InitialState: RootState = {
    game: InitialGameState
};

const rootReducer = combineReducers<RootState>({
    game: gameReducer
});

function configureStore(initialState: RootState): Store<RootState, RootAction> {
    return createStore<RootState, RootAction, never>(
        rootReducer,
        initialState
    )
}

const reset = !!location.search.split("&").find(key => key.split("=")[0] == "reset");

export const store = reset ? configureStore(InitialState) : configureStore(loadStorage());

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
        const serializedState = JSON.stringify(store.getState());
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (err) {
        console.error(err);
    }
}
