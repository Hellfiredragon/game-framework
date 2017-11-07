import {InitialGameState} from "./state";
import {GameActions, RESET_GAME, UPDATE_FRAME} from "./actions";

export const gameReducer = (state = InitialGameState, action: GameActions[keyof GameActions]) => {
    switch (action.type) {
        case UPDATE_FRAME:
            return state;
        case RESET_GAME:
            return InitialGameState;
    }
    return state;
};
