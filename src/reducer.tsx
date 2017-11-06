import {InitialState} from "./state";
import {GameActions, UPDATE_FRAME} from "./actions";

export const gameReducer = (state = InitialState, action: GameActions[keyof GameActions]) => {
    switch (action.type) {
        case UPDATE_FRAME:
            return {
                gold: state.gold + 1
            }
    }
    return state;
};
