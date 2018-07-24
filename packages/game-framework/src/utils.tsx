import {getResource} from "./engine/resource";
import {getBuilding} from "./engine/building";

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

export function resourceHint(array: number[]): string {
    let hint = "";
    for (let i in array) {
        hint += array[i] + " " + getResource(Number(i)).name + ", ";
    }
    return hint.substr(0, hint.length - 2);
}

export function buildingHint(array: number[]): string {
    let hint = "";
    for (let i in array) {
        hint += getBuilding(Number(i)).name + " level " + array[i] + ", ";
    }
    return hint.substr(0, hint.length - 2);
}

export function cloneArray<T>(array: T[]): T[] {
    return ([] as T[]).concat(array);
}

export interface FrameContainer {
    frameCount: number;
    frameLength: number;
}

export function withFrameVariation<T extends object>(arr: T[]): Array<T & FrameContainer> {
    const result: Array<T & FrameContainer> = [];
    arr.forEach(t => {
        result.push({ ...(t as any), frameCount: 100 * 120, frameLength: 1 / 120 });
        result.push({ ...(t as any), frameCount: 100 * 60, frameLength: 1 / 60 });
        result.push({ ...(t as any), frameCount: 100 * 30, frameLength: 1 / 30 });
        result.push({ ...(t as any), frameCount: 100 * 10, frameLength: 1 / 10 });
        result.push({ ...(t as any), frameCount: 100, frameLength: 1 });
    });
    return result;
}
