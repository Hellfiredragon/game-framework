import "./index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Main, createGameLoop} from "game-framework";

export namespace Y {
    export const Y = 2;
}

const div = document.createElement("div");
document.body.appendChild(div);

const gameLoop = createGameLoop(() => {
    ReactDOM.render(<Main/>, div);
});

gameLoop();

