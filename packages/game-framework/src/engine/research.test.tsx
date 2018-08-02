import {createResearch, doResearch, getExploredResearch, getResearch} from "./research";
import {ResearchPoints} from "./resource.test";
import {buildingHint, Given, obj2Arr, researchHint, Then, When} from "../utils";
import {addBuilding, createProductionCluster} from "./production-cluster";
import {getBuilding} from "./building";
import {Global} from "./global";

export const BaseSmelting = createResearch({
    name: "Base Smelting",
    category: "Building",
    affectedProperty: "ProductionMultiplier",
    cost: { [ResearchPoints.id]: 100 },
    costFactor: { [ResearchPoints.id]: 1.1 },
});

export const BaseMining = createResearch({
    name: "Base Mining",
    category: "Building",
    affectedProperty: "ProductionMultiplier",
    cost: { [ResearchPoints.id]: 100 },
    costFactor: { [ResearchPoints.id]: 1.1 },
    explored: true,
    activateResearch: { [BaseSmelting.id]: 1 }
});

export const OtherResearch = createResearch({
    name: "Other Research",
    category: "Building",
    affectedProperty: "ProductionBase",
    cost: { [ResearchPoints.id]: 100 },
    costFactor: { [ResearchPoints.id]: 1.1 }
});

Given("the global state", () => {

    When("the player researches something", () => {

        beforeEach(() => {
            Global.researchProjects.forEach(x => x.explored = false);
        });

        [
            {
                startResources: { [ResearchPoints.id]: 10000 },
                startResearch: {},
                researchWants: { [BaseMining.id]: 1 },
                expectedResources: { [ResearchPoints.id]: 9900 },
                expectedResearch: { [BaseMining.id]: 1 },
                expectedExplored: [BaseMining, BaseSmelting]
            },
            {
                startResources: { [ResearchPoints.id]: 10000 },
                startResearch: { [BaseMining.id]: 1 },
                researchWants: { [BaseMining.id]: 2 },
                expectedResources: { [ResearchPoints.id]: 9769 },
                expectedResearch: { [BaseMining.id]: 3 },
                expectedExplored: [BaseMining, BaseSmelting]
            },
            {
                startResources: { [ResearchPoints.id]: 10000 },
                startResearch: { [BaseMining.id]: 1 },
                researchWants: { [BaseMining.id]: 2, [BaseSmelting.id]: 2, [OtherResearch.id]: 1 },
                expectedResources: { [ResearchPoints.id]: 9459 },
                expectedResearch: { [BaseMining.id]: 3, [BaseSmelting.id]: 2, [OtherResearch.id]: 1 },
                expectedExplored: [BaseMining, BaseSmelting, OtherResearch]
            },
        ].forEach(param => {
            const startResources = obj2Arr(param.startResources);
            const startResearch = obj2Arr(param.startResearch);
            const researchWants = obj2Arr(param.researchWants);
            const expectedResources = obj2Arr(param.expectedResources);
            const expectedResearch = obj2Arr(param.expectedResearch);

            Then(`it should contain the research ${researchHint(expectedResearch)}`, () => {
                Global.resources = startResources;
                Global.researchLevels = startResearch;

                for (let i in researchWants) {
                    const research = getResearch(i);
                    const result = doResearch(research, researchWants[i]);
                    expect(result).toBe(true);
                }

                expect(Global.resources).toEqual(expectedResources, "resources");
                expect(Global.researchLevels).toEqual(expectedResearch, "research");
                expect(getExploredResearch().map(x => x.name).sort()).toEqual(param.expectedExplored.map(x => x.name).sort());
            });

        });

    });

});
