import * as React from "react";
import * as ReactDOM from "react-dom";

import {createGameLoop} from "./loop";
import {updateAllProductionCluster} from "./engine/production-cluster";
import {Main} from "./views/main";

export {createBuilding, Building} from "./engine/building";
export {configure, GlobalState} from "./engine/global";
export {createProductionCluster, ProductionCluster} from "./engine/production-cluster";
export {createResource, Resource} from "./engine/resource";

export function startGame(container: Element) {
    const gameLoop = createGameLoop(() => {
        updateAllProductionCluster();
    }, () => {
        ReactDOM.render(<Main/>, container);
    });

    gameLoop();
}
