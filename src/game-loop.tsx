import {action} from "mobx";
import {GameState, save} from "./game-state";
import {BOOST_SPEED, GAME_SPEED, SAVE_INTERVAL_SEC} from "./constants";

let last = 0;
let lastSaved = 0;

const gameLoop = action(function (millis: number) {
    const state = GameState();
    let secs = ((millis - last) / 1000) * GAME_SPEED;
    last = millis;
    lastSaved += secs;

    if (lastSaved > SAVE_INTERVAL_SEC) {
        state.lastSaved = Date.now();
        lastSaved = 0;
        save();
    }

    if (state.boostActive) {
        const boostedSecs = secs * BOOST_SPEED;
        if (boostedSecs > state.boostSec) {
            secs = state.boostSec;
            state.boostSec = 0;
            state.boostActive = false;
        } else {
            secs = boostedSecs;
            state.boostSec -= boostedSecs;
        }
    }

    requestAnimationFrame(gameLoop)
});

export function start() {
    requestAnimationFrame(gameLoop);
}
