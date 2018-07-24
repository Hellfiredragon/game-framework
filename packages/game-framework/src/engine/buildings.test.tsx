import {createBuilding, Building} from "./building";
import {Iron, Stone, Wood} from "./resource.test";
import {Given, Then, When} from "../utils";
import {createProductionCluster} from "./production-cluster";

export const Lumberjack = createBuilding("Lumberjack", { [Wood.id]: 10 }, { [Wood.id]: 2 });
export const StoneWorker = createBuilding("StoneWorker", { [Wood.id]: 10, [Stone.id]: 10 }, { [Wood.id]: 2, [Stone.id]: 3 });
export const IronMine = createBuilding("IronMine", { [Stone.id]: 10, [Iron.id]: 20 }, { [Stone.id]: 3, [Iron.id]: 4 });

Given("A building", () => {

    When("it was build", () => {

        Then("it should produce resources", () => {
            const cluster = createProductionCluster("test");

        });

    });

});
