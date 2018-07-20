import {getItem} from "./state/game-state";

export function obj2Arr(obj: any): number[] {
    const result: number[] = [];
    for (let i in obj) {
        result[i] = obj[i];
    }
    return result;
}

export function Given(name: string, f: () => any) {
    describe("Given " + name, f);
}

export function When(action: string, f: () => any) {
    describe("When " + action, f);
}

export function Then(result: string, f: () => any) {
    it("Then " + result, f);
}

export function itemHint(array: number[]): string {
    let hint = "";
    for (let i in array) {
        hint += array[i] + " " + getItem(Number(i)).name + ", ";
    }
    return hint.substr(0, hint.length - 2);
}