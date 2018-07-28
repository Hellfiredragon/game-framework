import {createProductionCluster} from "game-framework";
import {Iron} from "./resource";

export const Moon = createProductionCluster({
    name: "Moon",
    explored: true,
    resources: {
        [Iron.id]: 100
    }
});

export const AsteroidZG54G = createProductionCluster({
    name: "Asteroid ZG54G",
    explored: true
});
