import {createResource, Resource} from "game-framework";

export const ResearchPoints = createResource({
    name: "Research Points",
    category: "Research"
});

export const IronOre = createResource({
    name: "Iron Ore"
});

export const Sand = createResource({
    name: "Sand"
});

export const CopperOre = createResource({
    name: "Copper Ore"
});

export const Iron = createResource({
    name: "Iron"
});

export const Concrete = createResource({
    name: "Concrete"
});

export const Copper = createResource({
    name: "Copper"
});

export const Silicon = createResource({
    name: "Silicon"
});

export const Tritium = createResource({
    name: "Tritium"
});

export const Steel = createResource({
    name: "Steel"
});

export const TestResources: { [id: number]: number } = {};

for (let i = 0; i < 100; i++) {
    const r = createResource({
        name: i + ""
    });
    TestResources[r.id] = 1;
}
