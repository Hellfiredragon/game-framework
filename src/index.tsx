import "../less/index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Game} from "./game";

const div = document.createElement("div");
document.body.appendChild(div);
ReactDOM.render(<Game/>, div);
