import {combineReducers, createStore, Store} from "redux";
import {GameActions} from "./actions";
import {GameState} from "./state";
import {gameReducer} from "./reducer";

export type RootAction =
    | GameActions[keyof GameActions]

export interface RootState {
    game: GameState
}

const rootReducer = combineReducers<RootState>({
    game: gameReducer
});

function configureStore(initialState?: RootState): Store<RootState, RootAction> {
    return createStore<RootState, RootAction, never>(
        rootReducer,
        initialState!
    )
}

export const store = configureStore();
