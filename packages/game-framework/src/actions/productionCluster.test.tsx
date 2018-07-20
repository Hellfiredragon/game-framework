import {Given, itemHint, obj2Arr, Then, When} from "../utils";
import {Iron, Stone, Wood} from "../state/items.test";
import {IronMine, Lumberjack, StoneWorker} from "../state/buildings.test";
import {addBuilding} from "./productionCluster";
import {Building} from "../state/game-state";

fdescribe("An production cluster", () => {

    When("I add a building", () => {

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
                const cluster = { resources: { items: start }, buildings: [] };

                expect(addBuilding(cluster, building)).toBe(true);

                expect(cluster.buildings[building.id]).toBe(1);
                expect(cluster.resources.items).toEqual(expected);
            })
        })

    });

});
