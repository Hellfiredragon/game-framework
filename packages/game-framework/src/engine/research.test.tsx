import {createResearch, doResearch, getExploredResearch, getResearch} from "./research";
import {Coal, Hydrogen, ResearchPoints} from "./resource.test";
import {buildingHint, Given, obj2Arr, researchHint, resourceHint, Then, When, withFrameVariation} from "../utils";
import {addBuilding, createProductionCluster, updateCluster} from "./production-cluster";
import {getBuilding} from "./building";
import {Global} from "./global";
import {Lab, PowerPlant} from "./building.test";
import {S_PER_UPDATE} from "./constants";

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

Given("A production cluster with research buildings", () => {

    When("the game updates", () => {

        beforeEach(() => {
            Global.resources = [];
        });

        withFrameVariation([
            {
                startResources: { [Hydrogen.id]: 1000, [Coal.id]: 1000 },
                startBuildings: { [Lab.id]: 1, [PowerPlant.id]: 1 },
                expectedClusterResources: { [Hydrogen.id]: 900, [Coal.id]: 900 },
                expectedGlobalResources: { [ResearchPoints.id]: 1000 },
            },
            {
                startResources: { [Hydrogen.id]: 50, [Coal.id]: 1000 },
                startBuildings: { [Lab.id]: 1, [PowerPlant.id]: 1 },
                expectedClusterResources: { [Hydrogen.id]: 0, [Coal.id]: 900 },
                expectedGlobalResources: { [ResearchPoints.id]: 500 },
            },
            {
                startResources: { [Hydrogen.id]: 1000, [Coal.id]: 1000 },
                startBuildings: { [Lab.id]: 5, [PowerPlant.id]: 4 },
                expectedClusterResources: { [Hydrogen.id]: 700, [Coal.id]: 600 },
                expectedGlobalResources: { [ResearchPoints.id]: 3000 },
            },
        ]).forEach(param => {
            const expectedClusterResources = obj2Arr(param.expectedClusterResources);
            const expectedGlobalResources = obj2Arr(param.expectedGlobalResources);

            Then(`it should produce globally \t${resourceHint(expectedGlobalResources)} in\t${param.frameCount * S_PER_UPDATE} seconds`, () => {
                const cluster = createProductionCluster({
                    name: "",
                    resources: param.startResources,
                    buildings: param.startBuildings
                });

                for (let i = 0; i < param.frameCount; i++) {
                    updateCluster(cluster)
                }

                cluster.resources.forEach((p, i) => cluster.resources[i] = Math.round(p));
                expect(cluster.resources).toEqual(expectedClusterResources);

                Global.resources.forEach((p, i) => Global.resources[i] = Math.round(p));
                expect(Global.resources).toEqual(expectedGlobalResources);
            });

        });

    });

});
