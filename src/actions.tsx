import {store} from "./store";

export const UPDATE_FRAME = "UPDATE_FRAME";
export const RESET_GAME = "RESET_GAME";

export type GameActions = {
    UPDATE_FRAME: {
        type: typeof UPDATE_FRAME,
        duration: number
    },
    RESET_GAME: {
        type: typeof RESET_GAME
    }
}

export const updateFrame = (duration: number) => store.dispatch({
    type: UPDATE_FRAME, duration
});

export const resetGame = () => store.dispatch({
    type: RESET_GAME
});
