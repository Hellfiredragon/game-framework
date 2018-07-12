import * as React from "react";
import * as ReactDOM from "react-dom";
import {ItWorks} from "game-framework";

export namespace Y {
    export const Y = 2;
}

console.log(ItWorks);

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<ItWorks/>, div);
