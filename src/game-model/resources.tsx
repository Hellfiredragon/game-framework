let lastId = 0;

const values: Resource[] = [];

export class Resource {

    public id: number;

    constructor(public name: string) {
        this.id = lastId++;
        values[this.id] = this;
    }
}

export const Iron = new Resource("Iron");
export const Coal = new Resource("Coal");
export const Steel = new Resource("Steel");

export interface ResourceAmount {
    key: Resource
    value: number
}

export interface Cost {
    key: Resource,
    value: number,
    increase: number
}

export const Resources: ReadonlyArray<Resource> = Object.freeze(values);
