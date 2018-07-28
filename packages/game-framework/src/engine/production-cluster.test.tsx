import {buildingHint, cloneArray, Given, obj2Arr, resourceHint, Then, When, withFrameVariation} from "../utils";
import {addBuilding, createProductionCluster, removeBuilding, ProductionCluster, updateCluster} from "./production-cluster";
import {Brick, Coal, Hydrogen, Iron, ResearchPoints, Stone, Wood} from "./resource.test";
import {Bonfire, BrickFurnace, FuelCell, HydrogenKatalysator, IronMine, Lab, Lumberjack, PowerPlant, StoneWorker} from "./buildings.test";
import {Building, createBuilding, getBuilding} from "./building";
import {Global} from "./global";
import {getResource} from "./resource";
import {S_PER_UPDATE} from "./constants";

export const MagicForest = createProductionCluster({
    name: "MagicForest"
});

Given("an production cluster", () => {

    When("I increase the building level", () => {

        const startResources = { [Wood.id]: 10000, [Stone.id]: 10000, [Iron.id]: 10000 };

        [
            {
                startResources,
                startBuildings: {},
                buildingsToAdd: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 9990, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 1 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 1 },
                buildingsToAdd: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 9980, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 2 }
            },
            {
                startResources,
                startBuildings: {},
                buildingsToAdd: { [Lumberjack.id]: 5 },
                expectedResources: { [Wood.id]: 9690, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 5 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9 },
                buildingsToAdd: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 4880, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 10 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9 },
                buildingsToAdd: { [StoneWorker.id]: 1 },
                expectedResources: { [Wood.id]: 9990, [Stone.id]: 9990, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 1 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9 },
                buildingsToAdd: { [StoneWorker.id]: 3 },
                expectedResources: { [Wood.id]: 9930, [Stone.id]: 9870, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 3 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9 },
                buildingsToAdd: { [StoneWorker.id]: 1, [IronMine.id]: 1 },
                expectedResources: { [Wood.id]: 9990, [Stone.id]: 9980, [Iron.id]: 9980 },
                expectedBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 1, [IronMine.id]: 1 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9 },
                buildingsToAdd: { [StoneWorker.id]: 3, [IronMine.id]: 3 },
                expectedResources: { [Wood.id]: 9930, [Stone.id]: 9740, [Iron.id]: 9580 },
                expectedBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 3, [IronMine.id]: 3 }
            },
        ].forEach(param => {
            const buildingsToAdd = obj2Arr(param.buildingsToAdd);
            const expectedResources = obj2Arr(param.expectedResources);
            const expectedBuildings = obj2Arr(param.expectedBuildings);

            Then(`it should contain ${resourceHint(expectedResources)} and ${buildingHint(expectedBuildings)}`, () => {
                const cluster = createProductionCluster({
                    name: "",
                    resources: param.startResources,
                    buildings: param.startBuildings
                });

                for (let i in buildingsToAdd) {
                    const building = getBuilding(i);
                    const result = addBuilding(cluster, building, buildingsToAdd[i]);
                    expect(result).toBe(true);
                }

                expect(cluster.buildings).toEqual(expectedBuildings, "buildings");
                expect(cluster.resources).toEqual(expectedResources, "resources");
            });
        });

    });

    When("I add a building without enough resources", () => {

        [
            {
                startResources: {},
                startBuildings: {},
                buildingsToAdd: { [Lumberjack.id]: 1 },
                expectedResources: {},
                expectedBuildings: {}
            },
            {
                startResources: { [Wood.id]: 10000, [Stone.id]: 10000, [Iron.id]: 10000 },
                startBuildings: {},
                buildingsToAdd: { [Lumberjack.id]: -1 },
                expectedResources: { [Wood.id]: 10000, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: {}
            },
            {
                startResources: { [Wood.id]: 5 },
                startBuildings: {},
                buildingsToAdd: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 5 },
                expectedBuildings: {}
            },
            {
                startResources: { [Wood.id]: 5 },
                startBuildings: { [Lumberjack.id]: 1 },
                buildingsToAdd: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 5 },
                expectedBuildings: { [Lumberjack.id]: 1 }
            },
        ].forEach(param => {
            const buildingsToAdd = obj2Arr(param.buildingsToAdd);
            const expectedResources = obj2Arr(param.expectedResources);
            const expectedBuildings = obj2Arr(param.expectedBuildings);

            Then(`it should contain\t${resourceHint(expectedResources)} and\t${buildingHint(expectedBuildings)}`, () => {
                const cluster = createProductionCluster({
                    name: "",
                    resources: param.startResources,
                    buildings: param.startBuildings
                });

                for (let i in buildingsToAdd) {
                    const building = getBuilding(i);
                    const result = addBuilding(cluster, building, buildingsToAdd[i]);
                    expect(result).toBe(false);
                }

                expect(cluster.buildings).toEqual(expectedBuildings, "buildings");
                expect(cluster.resources).toEqual(expectedResources, "resources");
            });
        });

    });

    When("I decrease the building level", () => {

        const startResources = { [Wood.id]: 10000, [Stone.id]: 10000, [Iron.id]: 10000 };

        [
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 1 },
                buildingsToRemove: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 10005, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 0 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 1 },
                buildingsToRemove: { [Lumberjack.id]: -1 },
                expectedResources: { [Wood.id]: 10000, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 1 }
            },
            {
                startResources,
                startBuildings: {},
                buildingsToRemove: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 10000, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: {}
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 2 },
                buildingsToRemove: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 10010, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 1 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 2 },
                buildingsToRemove: { [StoneWorker.id]: 1 },
                expectedResources: { [Wood.id]: 10000, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 2 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 5 },
                buildingsToRemove: { [Lumberjack.id]: 5 },
                expectedResources: { [Wood.id]: 10155, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 0 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 5 },
                buildingsToRemove: { [Lumberjack.id]: 10 },
                expectedResources: { [Wood.id]: 10155, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 0 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9 },
                buildingsToRemove: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 11280, [Stone.id]: 10000, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 8 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 1 },
                buildingsToRemove: { [StoneWorker.id]: 1 },
                expectedResources: { [Wood.id]: 10005, [Stone.id]: 10005, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 0 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 5 },
                buildingsToRemove: { [StoneWorker.id]: 3 },
                expectedResources: { [Wood.id]: 10140, [Stone.id]: 10585, [Iron.id]: 10000 },
                expectedBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 2 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 2, [IronMine.id]: 2 },
                buildingsToRemove: { [StoneWorker.id]: 1, [IronMine.id]: 1 },
                expectedResources: { [Wood.id]: 10010, [Stone.id]: 10030, [Iron.id]: 10040 },
                expectedBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 1, [IronMine.id]: 1 }
            },
            {
                startResources,
                startBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 5, [IronMine.id]: 5 },
                buildingsToRemove: { [StoneWorker.id]: 3, [IronMine.id]: 3 },
                expectedResources: { [Wood.id]: 10140, [Stone.id]: 11170, [Iron.id]: 13360 },
                expectedBuildings: { [Lumberjack.id]: 9, [StoneWorker.id]: 2, [IronMine.id]: 2 }
            },
        ].forEach(param => {
            const buildingsToRemove = obj2Arr(param.buildingsToRemove);
            const expectedResources = obj2Arr(param.expectedResources);
            const expectedBuildings = obj2Arr(param.expectedBuildings);

            Then(`it should contain\t${resourceHint(expectedResources)} and\t${buildingHint(expectedBuildings)}`, () => {
                const cluster = createProductionCluster({
                    name: "",
                    resources: param.startResources,
                    buildings: param.startBuildings
                });

                for (let i in buildingsToRemove) {
                    const building = getBuilding(i);
                    removeBuilding(cluster, building, buildingsToRemove[i]);
                }

                expect(cluster.buildings).toEqual(expectedBuildings, "buildings");
                expect(cluster.resources).toEqual(expectedResources, "resources");
            });

        });

    });

    When("I have build a building", () => {

        withFrameVariation([
            {
                startBuildings: { [Lumberjack.id]: 1 },
                expectedResources: { [Wood.id]: 100 },
            },
            {
                startBuildings: { [Lumberjack.id]: 2 },
                expectedResources: { [Wood.id]: 200 },
            },
            {
                startBuildings: { [Lumberjack.id]: 10 },
                expectedResources: { [Wood.id]: 1000 },
            },
            {
                startBuildings: { [Lumberjack.id]: 10, [StoneWorker.id]: 5, [IronMine.id]: 2 },
                expectedResources: { [Wood.id]: 1000, [Stone.id]: 500, [Iron.id]: 200 },
            },
        ]).forEach(param => {
            const expectedResources = obj2Arr(param.expectedResources);

            Then(`it should produce\t${resourceHint(expectedResources)} in\t${param.frameCount * S_PER_UPDATE} seconds`, () => {
                const cluster = createProductionCluster({
                    name: "",
                    buildings: param.startBuildings
                });

                for (let i = 0; i < param.frameCount; i++) {
                    updateCluster(cluster)
                }

                cluster.resources.forEach((p, i) => {
                    cluster.resources[i] = Math.round(p);
                });

                expect(cluster.resources).toEqual(expectedResources, "resources");
            });

        });

        withFrameVariation([
            {
                startResources: { [Wood.id]: 1000 },
                startBuildings: { [Bonfire.id]: 1 },
                expectedResources: { [Wood.id]: 900 },
            },
            {
                startResources: { [Wood.id]: 100 },
                startBuildings: { [Bonfire.id]: 1 },
                expectedResources: { [Wood.id]: 0 },
            },
            {
                startResources: { [Wood.id]: 50 },
                startBuildings: { [Bonfire.id]: 1 },
                expectedResources: { [Wood.id]: 0 },
            },
        ]).forEach(param => {
            const startResources = obj2Arr(param.startResources);
            const expectedResources = obj2Arr(param.expectedResources);

            const consumedResources: number[] = [];
            startResources.forEach((_, resourceId) => {
                consumedResources[resourceId] = startResources[resourceId] - expectedResources[resourceId];
            });

            Then(`it should consume\t${resourceHint(consumedResources)} in ${param.frameCount * S_PER_UPDATE} seconds`, () => {
                const cluster = createProductionCluster({
                    name: "",
                    resources: param.startResources,
                    buildings: param.startBuildings
                });

                for (let i = 0; i < param.frameCount; i++) {
                    updateCluster(cluster)
                }

                cluster.resources.forEach((p, i) => {
                    cluster.resources[i] = Math.round(p);
                });

                expect(cluster.resources).toEqual(expectedResources, "resources");
            });

        });

        withFrameVariation([
            {
                startResources: { [Wood.id]: 1000, [Stone.id]: 1000 },
                startBuildings: { [BrickFurnace.id]: 1 },
                expectedResources: { [Wood.id]: 900, [Stone.id]: 900, [Brick.id]: 100 },
            },
            {
                startResources: { [Wood.id]: 100, [Stone.id]: 100 },
                startBuildings: { [BrickFurnace.id]: 1 },
                expectedResources: { [Wood.id]: 0, [Stone.id]: 0, [Brick.id]: 100 },
            },
            {
                startResources: { [Wood.id]: 50, [Stone.id]: 50 },
                startBuildings: { [BrickFurnace.id]: 1 },
                expectedResources: { [Wood.id]: 0, [Stone.id]: 0, [Brick.id]: 50 },
            },
        ]).forEach(param => {
            const startResources = obj2Arr(param.startResources);
            const expectedResources = obj2Arr(param.expectedResources);

            const producedResources: number[] = [];
            const consumedResources: number[] = [];
            startResources.forEach((_, resourceId) => {
                consumedResources[resourceId] = startResources[resourceId] - expectedResources[resourceId];
            });
            expectedResources.forEach((_, resourceId) => {
                if (expectedResources[resourceId] > (startResources[resourceId] || 0)) {
                    producedResources[resourceId] = expectedResources[resourceId] - (startResources[resourceId] || 0)
                }
            });

            Then(`it should produce\t${resourceHint(producedResources)} and consume\t${resourceHint(consumedResources)} in ${param.frameCount * S_PER_UPDATE} seconds`, () => {
                const cluster = createProductionCluster({
                    name: "",
                    resources: param.startResources,
                    buildings: param.startBuildings
                });

                for (let i = 0; i < param.frameCount; i++) {
                    updateCluster(cluster)
                }

                cluster.resources.forEach((p, i) => {
                    cluster.resources[i] = Math.round(p);
                });

                expect(cluster.resources).toEqual(expectedResources, "resources");
            });

        });

        withFrameVariation([
            {
                startResources: { [Hydrogen.id]: 100 },
                startBuildings: { [HydrogenKatalysator.id]: 1, [FuelCell.id]: 1 },
                expectedResources: { [Hydrogen.id]: 200 },
            },
            {
                startResources: { [Hydrogen.id]: 100 },
                startBuildings: { [HydrogenKatalysator.id]: 2, [FuelCell.id]: 1 },
                expectedResources: { [Hydrogen.id]: 400 },
            },
            {
                startResources: { [Hydrogen.id]: 100 },
                startBuildings: { [HydrogenKatalysator.id]: 3, [FuelCell.id]: 1 },
                expectedResources: { [Hydrogen.id]: 200 },
            },
            {
                startResources: { [Hydrogen.id]: 100 },
                startBuildings: { [HydrogenKatalysator.id]: 10, [FuelCell.id]: 4 },
                expectedResources: { [Hydrogen.id]: 900 },
            },
            {
                startResources: { [Hydrogen.id]: 0 },
                startBuildings: { [HydrogenKatalysator.id]: 10, [FuelCell.id]: 4 },
                expectedResources: { [Hydrogen.id]: 0 },
            },
            {
                startResources: { [Hydrogen.id]: 0, [Coal.id]: 10000 },
                startBuildings: { [HydrogenKatalysator.id]: 10, [PowerPlant.id]: 10, [FuelCell.id]: 4 },
                expectedResources: { [Hydrogen.id]: 1600, [Coal.id]: 9000 },
            },
            {
                startResources: { [Hydrogen.id]: 0, [Coal.id]: 10000 },
                startBuildings: { [HydrogenKatalysator.id]: 10, [PowerPlant.id]: 3, [FuelCell.id]: 2 },
                expectedResources: { [Hydrogen.id]: 1799, [Coal.id]: 9700 },
            },
            {
                startResources: { [Hydrogen.id]: 0, [Coal.id]: 10000 },
                startBuildings: { [HydrogenKatalysator.id]: 10, [PowerPlant.id]: 2, [FuelCell.id]: 2 },
                expectedResources: { [Hydrogen.id]: 0, [Coal.id]: 9800 },
            },
            {
                startResources: { [Coal.id]: 10000 },
                startBuildings: { [Lab.id]: 1, [PowerPlant.id]: 1 },
                expectedResources: { [Coal.id]: 9900, [ResearchPoints.id]: 10000 }
            },
            {
                startResources: { [Coal.id]: 10000 },
                startBuildings: { [Lab.id]: 6, [PowerPlant.id]: 4 },
                expectedResources: { [Coal.id]: 9600, [ResearchPoints.id]: 20000 }
            }
        ]).forEach(param => {
            const startResources = obj2Arr(param.startResources);
            const expectedResources = obj2Arr(param.expectedResources);

            const producedResources: number[] = [];
            expectedResources.forEach((_, resourceId) => {
                if (expectedResources[resourceId] > (startResources[resourceId] || 0)) {
                    producedResources[resourceId] = expectedResources[resourceId] - (startResources[resourceId] || 0)
                }
            });

            Then(`with energy it should produce partially \t${resourceHint(producedResources)} in\t${param.frameCount * S_PER_UPDATE} seconds`, () => {
                const cluster = createProductionCluster({
                    name: "",
                    resources: param.startResources,
                    buildings: param.startBuildings
                });

                for (let i = 0; i < param.frameCount; i++) {
                    updateCluster(cluster)
                }

                cluster.resources.forEach((p, i) => {
                    cluster.resources[i] = Math.round(p);
                });

                expect(cluster.resources).toEqual(expectedResources, "resources");
            });

        });

    });

});
