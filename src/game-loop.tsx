import {action} from "mobx";
import {GameState} from "./game-state";

let last = 0;

const gameLoop = action(function (millis: number) {
    const secs = (millis - last) / 1000;
    last = millis;
    GameState.test += secs;
    requestAnimationFrame(gameLoop)
});

export function start() {
    requestAnimationFrame(gameLoop);
}
