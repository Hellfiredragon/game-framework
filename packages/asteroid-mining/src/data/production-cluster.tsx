import {createProductionCluster} from "game-framework";
import {Concrete, Iron, Silicon, TestResources} from "./resource";

export const Moon = createProductionCluster({
    name: "Moon",
    explored: true,
    resources: {
        [Iron.id]: 1000,
        [Concrete.id]: 1000,
        [Silicon.id]: 1000
    }
});

export const AsteroidZG54G = createProductionCluster({
    name: "Asteroid ZG54G",
    explored: true,
    resources: TestResources
});
