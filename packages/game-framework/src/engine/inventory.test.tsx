import {addResources, Inventory, removeResources} from "./inventory";
import {Given, resourceHint, obj2Arr, Then, When} from "../utils";
import {Iron, Stone, Wood} from "./resource.test";
import {getResource} from "./resource";

function empty(): Inventory {
    return { resources: [] }
}

export function sumUp(list: number[][]): number[] {
    return list.reduce((prev, curr) => {
        const result: number[] = [];
        for (let i in prev) result[i] = (prev[i] || 0) + (curr[i] || 0);
        for (let i in curr) result[i] = (prev[i] || 0) + (curr[i] || 0);
        return result;
    });
}

export function subtract(start: number[], toRemove: number[]): number[] {
    const result: number[] = [];
    for (let i in start) result[i] = (start[i] || 0) - (toRemove[i] || 0);
    return result;
}

Given("an inventory", () => {

    Then("it should be empty", () => {
        const inventory = empty();
        expect(inventory.resources.length).toBe(0);
    });

    When("When I add items", () => {

        [
            [{ [Wood.id]: 10 }],
            [{ [Wood.id]: 100, [Stone.id]: 100 }],
            [{ [Wood.id]: 100, [Iron.id]: 100 }],
            [{ [Stone.id]: 100, [Iron.id]: 100 }],
            [{ [Wood.id]: 100, [Stone.id]: 100, [Iron.id]: 100 }],
        ].forEach(param => {
            const items = obj2Arr(param[0]);

            Then(`it should contain ${resourceHint(items)}`, () => {
                const inventory = empty();

                addResources(inventory, items);

                expect(inventory.resources.length).toBe(items.length, "inventory size");
                for (let i in inventory.resources) {
                    expect(inventory.resources[i]).toBe(items[i], getResource(i).name);
                }
            });
        });

    });

    When("I add items multiple times", () => {

        [
            [{ [Wood.id]: 10 }, { [Wood.id]: 10 }],
            [{ [Wood.id]: 0 }, { [Wood.id]: 10 }],
            [{ [Wood.id]: 100 }, { [Wood.id]: 10 }, { [Stone.id]: 10 }],
            [{ [Wood.id]: 100 }, { [Wood.id]: 10 }, { [Stone.id]: 10 }, { [Iron.id]: 10 }],
            [{ [Wood.id]: 100 }, { [Wood.id]: 10 }, { [Stone.id]: 10, [Iron.id]: 10 }],
            [{ [Wood.id]: 100 }, { [Wood.id]: 10, [Stone.id]: 10, [Iron.id]: 10 }],
        ].forEach(param => {
            const items = param.map(obj2Arr);
            const expected = sumUp(items);

            Then(`it should contain ${resourceHint(expected)}`, () => {
                const inventory = empty();

                items.forEach(i => addResources(inventory, i));

                expect(inventory.resources.length).toBe(expected.length, "inventory size");
                for (let i in inventory.resources) {
                    expect(inventory.resources[i]).toBe(expected[i], getResource(i).name);
                }
            });
        })

    });

    When("I remove existing items", () => {

        [
            [{ [Wood.id]: 10 }, { [Wood.id]: 10 }],
            [{ [Wood.id]: 100 }, { [Wood.id]: 10 }],
            [{ [Wood.id]: 100, [Stone.id]: 100 }, { [Wood.id]: 10, [Stone.id]: 10 }],
            [{ [Wood.id]: 100, [Iron.id]: 100 }, { [Wood.id]: 10, [Iron.id]: 100 }],
        ].forEach(param => {
            const start = obj2Arr(param[0]);
            const toRemove = obj2Arr(param[1]);
            const expected = subtract(start, toRemove);

            Then(`it should contain ${resourceHint(expected)}`, () => {
                const inventory: Inventory = { resources: start };

                expect(removeResources(inventory, toRemove)).toBe(true);

                expect(inventory.resources.length).toBe(expected.length, "inventory size");
                for (let i in inventory.resources) {
                    expect(inventory.resources[i]).toBe(expected[i], getResource(i).name);
                }
            });
        });

    });

    When("I remove to many items", () => {

        [
            [{ [Wood.id]: 10 }, { [Wood.id]: 20 }],
            [{ [Wood.id]: 100 }, { [Wood.id]: 101 }],
            [{ [Wood.id]: 100, [Stone.id]: 100 }, { [Wood.id]: 200, [Stone.id]: 10 }],
            [{ [Wood.id]: 100, [Iron.id]: 100 }, { [Wood.id]: 10, [Iron.id]: 200 }],
        ].forEach(param => {
            const expected = obj2Arr(param[0]);
            const items = obj2Arr(param[1]);

            Then(`it should contain ${resourceHint(expected)}`, () => {
                const inventory: Inventory = { resources: expected };

                expect(removeResources(inventory, items)).toBe(false);

                expect(inventory.resources.length).toBe(expected.length, "inventory size");
                for (let i in inventory.resources) {
                    expect(inventory.resources[i]).toBe(expected[i], getResource(i).name);
                }
            });
        });

    });

});
