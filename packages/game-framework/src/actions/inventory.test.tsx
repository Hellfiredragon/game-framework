import {createItem, getItem} from "../state/game-state";
import {Inventory} from "../../dist/state/game-state";
import {addItems, removeItems} from "./inventory";
import {Given, params, Then, When} from "../utils/utils";

const wood = createItem("Wood");
const stone = createItem("Stone");
const iron = createItem("Iron");

function empty(): Inventory {
    return { items: [] }
}

function itemHint(array: number[]): string {
    let hint = "";
    for (let i in array) {
        hint += array[i] + " " + getItem(Number(i)).name + ", ";
    }
    return hint.substr(0, hint.length - 2);
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
        expect(inventory.items.length).toBe(0);
    });

    When("When I add items", () => {

        params(
            [{ [wood.id]: 10 }],
            [{ [wood.id]: 100, [stone.id]: 100 }],
            [{ [wood.id]: 100, [iron.id]: 100 }],
            [{ [stone.id]: 100, [iron.id]: 100 }],
            [{ [wood.id]: 100, [stone.id]: 100, [iron.id]: 100 }],
        ).forEach(param => {
            const items = param[0];
            Then(`it should contain ${itemHint(items)}`, () => {
                const inventory = empty();

                addItems(inventory, items);

                expect(inventory.items.length).toBe(items.length, "inventory size");
                for (let i in inventory.items) {
                    expect(inventory.items[i]).toBe(items[i], getItem(i).name);
                }
            });
        });

    });

    When("I add items multiple times", () => {

        params(
            [{ [wood.id]: 10 }, { [wood.id]: 10 }],
            [{ [wood.id]: 0 }, { [wood.id]: 10 }],
            [{ [wood.id]: 100 }, { [wood.id]: 10 }, { [stone.id]: 10 }],
            [{ [wood.id]: 100 }, { [wood.id]: 10 }, { [stone.id]: 10 }, { [iron.id]: 10 }],
            [{ [wood.id]: 100 }, { [wood.id]: 10 }, { [stone.id]: 10, [iron.id]: 10 }],
            [{ [wood.id]: 100 }, { [wood.id]: 10, [stone.id]: 10, [iron.id]: 10 }],
        ).forEach(param => {
            const expected = sumUp(param);
            Then(`it should contain ${itemHint(expected)}`, () => {
                const inventory = empty();

                param.forEach(items => addItems(inventory, items));

                expect(inventory.items.length).toBe(expected.length, "inventory size");
                for (let i in inventory.items) {
                    expect(inventory.items[i]).toBe(expected[i], getItem(i).name);
                }
            });
        })

    });

    When("I remove existing items", () => {

        params(
            [{ [wood.id]: 10 }, { [wood.id]: 10 }],
            [{ [wood.id]: 100 }, { [wood.id]: 10 }],
            [{ [wood.id]: 100, [stone.id]: 100 }, { [wood.id]: 10, [stone.id]: 10 }],
            [{ [wood.id]: 100, [iron.id]: 100 }, { [wood.id]: 10, [iron.id]: 100 }],
        ).forEach(param => {
            const expected = subtract(param[0], param[1]);
            Then(`it should contain ${itemHint(expected)}`, () => {
                const inventory: Inventory = { items: param[0] };

                expect(removeItems(inventory, param[1])).toBe(true);

                expect(inventory.items.length).toBe(expected.length, "inventory size");
                for (let i in inventory.items) {
                    expect(inventory.items[i]).toBe(expected[i], getItem(i).name);
                }
            });
        });

    });

    When("I remove to many items", () => {

        params(
            [{ [wood.id]: 10 }, { [wood.id]: 20 }],
            [{ [wood.id]: 100 }, { [wood.id]: 101 }],
            [{ [wood.id]: 100, [stone.id]: 100 }, { [wood.id]: 200, [stone.id]: 10 }],
            [{ [wood.id]: 100, [iron.id]: 100 }, { [wood.id]: 10, [iron.id]: 200 }],
        ).forEach(param => {
            const expected = param[0];
            const items = param[1];

            Then(`it should contain ${itemHint(expected)}`, () => {
                const inventory: Inventory = { items: expected };

                expect(removeItems(inventory, items)).toBe(false);

                expect(inventory.items.length).toBe(expected.length, "inventory size");
                for (let i in inventory.items) {
                    expect(inventory.items[i]).toBe(expected[i], getItem(i).name);
                }
            });
        });

    });

});
