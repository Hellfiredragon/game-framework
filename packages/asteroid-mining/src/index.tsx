import "./index.less";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "./data/building";
import "./data/production-cluster";
import {startGame} from "game-framework";

const div = document.createElement("div");
document.body.appendChild(div);

startGame(div);
