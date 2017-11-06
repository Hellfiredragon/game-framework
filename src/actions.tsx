export const UPDATE_FRAME = "UPDATE_FRAME";

export type GameActions = {
    UPDATE_FRAME: {
        type: typeof UPDATE_FRAME,
        duration: number
    }
}

export const updateFrame = (duration: number): GameActions[typeof UPDATE_FRAME] => ({
    type: UPDATE_FRAME, duration
});
