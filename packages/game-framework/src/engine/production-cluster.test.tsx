import {buildingHint, cloneArray, Given, obj2Arr, resourceHint, Then, When} from "../utils";
import {addBuilding, createProductionCluster, removeBuilding, ProductionCluster} from "./production-cluster";
import {Iron, Stone, Wood} from "./resource.test";
import {IronMine, Lumberjack, StoneWorker} from "./buildings.test";
import {Building, createBuilding, getBuilding} from "./building";

export const MagicForest = createProductionCluster("MagicForest");

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
            const startResources = obj2Arr(param.startResources);
            const startBuildings = obj2Arr(param.startBuildings);
            const buildingsToAdd = obj2Arr(param.buildingsToAdd);
            const expectedResources = obj2Arr(param.expectedResources);
            const expectedBuildings = obj2Arr(param.expectedBuildings);

            Then(`it should contain ${resourceHint(expectedResources)} and ${buildingHint(expectedBuildings)}`, () => {
                const cluster = { id: 1, name: "", resources: { items: cloneArray(startResources) }, buildings: cloneArray(startBuildings) };

                for (let i in buildingsToAdd) {
                    const building = getBuilding(i);
                    const result = addBuilding(cluster, building, buildingsToAdd[i]);
                    expect(result).toBe(true);
                }

                expect(cluster.buildings).toEqual(expectedBuildings, "buildings");
                expect(cluster.resources.items).toEqual(expectedResources, "resources");
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
            const startResources = obj2Arr(param.startResources);
            const startBuildings = obj2Arr(param.startBuildings);
            const buildingsToAdd = obj2Arr(param.buildingsToAdd);
            const expectedResources = obj2Arr(param.expectedResources);
            const expectedBuildings = obj2Arr(param.expectedBuildings);

            Then(`it should contain ${resourceHint(expectedResources)} and ${buildingHint(expectedBuildings)}`, () => {
                const cluster = { id: 1, name: "", resources: { items: cloneArray(startResources) }, buildings: cloneArray(startBuildings) };

                for (let i in buildingsToAdd) {
                    const building = getBuilding(i);
                    const result = addBuilding(cluster, building, buildingsToAdd[i]);
                    expect(result).toBe(false);
                }

                expect(cluster.buildings).toEqual(expectedBuildings, "buildings");
                expect(cluster.resources.items).toEqual(expectedResources, "resources");
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
            const startResources = obj2Arr(param.startResources);
            const startBuildings = obj2Arr(param.startBuildings);
            const buildingsToRemove = obj2Arr(param.buildingsToRemove);
            const expectedResources = obj2Arr(param.expectedResources);
            const expectedBuildings = obj2Arr(param.expectedBuildings);

            Then(`it should contain ${resourceHint(expectedResources)} and ${buildingHint(expectedBuildings)}`, () => {
                const cluster = { id: 1, name: "", resources: { items: cloneArray(startResources) }, buildings: cloneArray(startBuildings) };

                for (let i in buildingsToRemove) {
                    const building = getBuilding(i);
                    removeBuilding(cluster, building, buildingsToRemove[i]);
                }

                expect(cluster.buildings).toEqual(expectedBuildings, "buildings");
                expect(cluster.resources.items).toEqual(expectedResources, "resources");
            });

        });

    });

});
