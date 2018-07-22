import {buildingHint, cloneArray, Given, obj2Arr, resourceHint, Then, When} from "../utils";
import {addBuilding, removeBuilding} from "./production-cluster";
import {Iron, Stone, Wood} from "./resource.test";
import {IronMine, Lumberjack, StoneWorker} from "./buildings.test";
import {Building, getBuilding} from "./building";

Given("an production cluster", () => {

    Given("I increase building level", () => {

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
                const cluster = { resources: { items: cloneArray(startResources) }, buildings: cloneArray(startBuildings) };

                for (let i in buildingsToAdd) {
                    const building = getBuilding(i);
                    addBuilding(cluster, building, buildingsToAdd[i]);
                }

                expect(cluster.buildings).toEqual(expectedBuildings, "buildings");
                expect(cluster.resources.items).toEqual(expectedResources, "resources");
            });

            Then(`addBuilding should return true`, () => {
                const cluster = { resources: { items: cloneArray(startResources) }, buildings: cloneArray(startBuildings) };

                for (let i in buildingsToAdd) {
                    const building = getBuilding(i);
                    expect(addBuilding(cluster, building, buildingsToAdd[i])).toBe(true)
                }
            });
        });

    });

    When("I add a building without enough resources", () => {

        [
            [{ [Wood.id]: 5 }, Lumberjack],
            [{ [Wood.id]: 5, [Stone.id]: 10 }, StoneWorker],
            [{ [Wood.id]: 5, [Stone.id]: 5, [IronMine.id]: 5 }, IronMine],
            [{}, IronMine],
        ].forEach(param => {
            const start = obj2Arr(param[0]);
            const building = param[1] as Building;

            Then(`it should contain ${resourceHint(start)}`, () => {
                const cluster = { resources: { items: cloneArray(start) }, buildings: [] };

                addBuilding(cluster, building, 1);

                expect(cluster.buildings[building.id]).toBe(undefined, building.name);
                expect(cluster.resources.items).toEqual(start, building.name);
            });

            Then(`addBuilding should return false`, () => {
                const cluster = { resources: { items: cloneArray(start) }, buildings: [] };

                const result = addBuilding(cluster, building, 1);

                expect(result).toBe(false, building.name);
            });
        });

    });

    When("I remove a building", () => {

        [
            [{ [Wood.id]: 20 }, Lumberjack, { [Wood.id]: 30 }],
            [{ [Wood.id]: 20, [Stone.id]: 10 }, StoneWorker, { [Wood.id]: 30, [Stone.id]: 20 }],
            [{
                [Wood.id]: 20,
                [Stone.id]: 20,
                [IronMine.id]: 20
            }, IronMine, {
                [Wood.id]: 20,
                [Stone.id]: 30,
                [Iron.id]: 40
            }],
            [{}, IronMine, { [Stone.id]: 10, [Iron.id]: 20 }]
        ].forEach(param => {
            const start = obj2Arr(param[0]);
            const building = param[1] as Building;
            const expected = obj2Arr(param[2]);

            Then(`it should contain ${resourceHint(expected)}`, () => {
                const cluster = { resources: { items: cloneArray(start) }, buildings: obj2Arr({ [building.id]: 1 }) };

                removeBuilding(cluster, building);

                expect(cluster.buildings[building.id]).toBe(0, building.name);
                expect(cluster.resources.items).toEqual(expected, building.name);
            });

            Then(`removeBuilding should return true`, () => {
                const cluster = { resources: { items: cloneArray(start) }, buildings: obj2Arr({ [building.id]: 1 }) };

                const result = removeBuilding(cluster, building);

                expect(result).toBe(true, building.name);

            });
        });
    });

});
