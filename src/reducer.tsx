import {InitialState} from "./state";
import {GameActions, RESET_GAME, UPDATE_FRAME} from "./actions";

export const gameReducer = (state = InitialState, action: GameActions[keyof GameActions]) => {
    switch (action.type) {
        case UPDATE_FRAME:
            return {
                gold: state.gold + 1
            };
        case RESET_GAME:
            return InitialState;
    }
    return state;
};
