import {action} from "mobx";
import {GameState, save} from "./game-state";
import {SAVE_INTERVAL_SEC} from "./constants";

let last = 0;
let lastSaved = 0;

const gameLoop = action(function (millis: number) {
    const secs = (millis - last) / 1000;
    last = millis;
    lastSaved += secs;
    if (lastSaved > SAVE_INTERVAL_SEC) {
        lastSaved = 0;
        save();
    }
    GameState().test += secs;
    requestAnimationFrame(gameLoop)
});

export function start() {
    requestAnimationFrame(gameLoop);
}
