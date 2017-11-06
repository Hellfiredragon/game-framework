import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {store} from "./store";
import {Provider} from "react-redux";
import {Game} from "./game";

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Provider store={store}>
    <Game/>
</Provider>, div);
