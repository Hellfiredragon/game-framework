import * as React from "react";
import * as ReactDOM from "react-dom";
import {Main} from "./views/main";

import {createGameLoop} from "./loop";
import {updateAllProductionCluster} from "./engine/production-cluster";

export {createBuilding} from "./engine/building";
export {configure, GlobalState} from "./engine/global";
export {createProductionCluster} from "./engine/production-cluster";
export {createResource} from "./engine/resource";

export function startGame(container: Element) {
    const gameLoop = createGameLoop(() => {
        updateAllProductionCluster();
    }, () => {
        ReactDOM.render(<Main/>, container);
    });

    gameLoop();
}
