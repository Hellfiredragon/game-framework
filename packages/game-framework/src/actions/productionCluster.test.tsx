import {cloneArray, Given, itemHint, obj2Arr, Then, When} from "../utils";
import {Iron, Stone, Wood} from "../state/items.test";
import {IronMine, Lumberjack, StoneWorker} from "../state/buildings.test";
import {addBuilding, removeBuilding} from "./productionCluster";
import {Building} from "../state/game-state";

fdescribe("An production cluster", () => {

    When("I add a building with enough resources", () => {

        [
            [{ [Wood.id]: 20 }, Lumberjack, { [Wood.id]: 10 }],
            [{ [Wood.id]: 20, [Stone.id]: 10 }, StoneWorker, { [Wood.id]: 10, [Stone.id]: 0 }],
            [{
                [Wood.id]: 20,
                [Stone.id]: 20,
                [IronMine.id]: 20
            }, IronMine, {
                [Wood.id]: 20,
                [Stone.id]: 10,
                [Iron.id]: 0
            }],
        ].forEach(param => {
            const start = obj2Arr(param[0]);
            const building = param[1] as Building;
            const expected = obj2Arr(param[2]);

            Then(`it should contain ${itemHint(expected)}`, () => {
                const cluster = { resources: { items: cloneArray(start) }, buildings: [] };

                addBuilding(cluster, building);

                expect(cluster.buildings[building.id]).toBe(1, building.name);
                expect(cluster.resources.items).toEqual(expected, building.name);
            });

            Then(`addBuilding should return true`, () => {
                const cluster = { resources: { items: cloneArray(start) }, buildings: [] };

                const result = addBuilding(cluster, building);

                expect(result).toBe(true, building.name);
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

            Then(`it should contain ${itemHint(start)}`, () => {
                const cluster = { resources: { items: cloneArray(start) }, buildings: [] };

                addBuilding(cluster, building);

                expect(cluster.buildings[building.id]).toBe(undefined, building.name);
                expect(cluster.resources.items).toEqual(start, building.name);
            });

            Then(`addBuilding should return false`, () => {
                const cluster = { resources: { items: cloneArray(start) }, buildings: [] };

                const result = addBuilding(cluster, building);

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

            Then(`it should contain ${itemHint(expected)}`, () => {
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
