import * as React from "react";
import * as ReactTestUtils from 'react-dom/test-utils';
import {Simulate} from "react-dom/test-utils";
import {findComponentWithClass, Given, scryComponentsWithType, Then, When} from "../utils";
import {createProductionCluster} from "..";
import {ProductionClusterList, ProductionClusterListItem} from "./production-cluster-list";
import {Global} from "../engine/global";
import {Asia, Europe, Russia} from "../engine/production-cluster.test";
import {ProductionClusterView} from "./production-cluster-view";

Given("a production cluster view", () => {

    When("it is rendered with cluster id", () => {

        Then("it should render the cluster name", () => {
            const div = findComponentWithClass<HTMLDivElement>(<ProductionClusterView id={Europe.id}/>, "gf-production-cluster-view");

            expect(div.textContent).toContain(Europe.name);
        });

        Then("it should render a back button", () => {
            const div = findComponentWithClass<HTMLDivElement>(<ProductionClusterView id={Europe.id}/>, "gf-chevron-left");
            Simulate.click(div);

            expect(Global.navigation.page).toBe("production-cluster-list");
        });

    });

});
