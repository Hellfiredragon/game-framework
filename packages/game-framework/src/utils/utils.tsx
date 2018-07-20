export function objToArray(obj: { [id: number]: number }): number[] {
    const result: number[] = [];
    for (let i in obj) {
        result[i] = obj[i];
    }
    return result;
}

export function params(...p: { [id: number]: number }[][]): number[][][] {
    return p.map(x => x.map(objToArray))
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
