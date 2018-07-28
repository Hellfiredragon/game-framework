import "./index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {createGameLoop} from "game-framework";

export namespace Y {
    export const Y = 2;
}

const div = document.createElement("div");
document.body.appendChild(div);

const gameLoop = createGameLoop(() => {
}, () => {
});

gameLoop();

