import * as React from "react";
import * as ReactTestUtils from 'react-dom/test-utils';
import {Simulate} from "react-dom/test-utils";
import {findComponentWithClass, Given, scryComponentsWithType, Then, When} from "../utils";
import {createProductionCluster} from "..";
import {ProductionClusterList, ProductionClusterListItem} from "./production-cluster-list";
import {Global} from "../engine/global";
import {Asia, Europe, Russia} from "../engine/production-cluster.test";

Given("a production cluster list", () => {

    When("some production cluster are explored", () => {

        Then("the list should render some items", () => {
            const items = scryComponentsWithType(<ProductionClusterList/>, ProductionClusterListItem);

            expect(items.map(x => x.props.id)).toEqual([Europe.id, Asia.id]);
        });

        Then("the list shouldn't render unexplored clusters", () => {
            const items = scryComponentsWithType(<ProductionClusterList/>, ProductionClusterListItem);

            expect(items.map(x => x.props.id).indexOf(Russia.id)).toBe(-1);
        });

    });

});

Given("a production cluster list item", () => {

    When("it is rendered with cluster id", () => {

        Then("it should render the cluster name", () => {
            const div = findComponentWithClass<HTMLDivElement>(<ProductionClusterListItem id={Europe.id}/>, "gf-production-cluster-list-item");

            expect(div.textContent).toContain(Europe.name);
        });

        Then("it should be clickable", () => {
            const div = findComponentWithClass<HTMLDivElement>(<ProductionClusterListItem id={Europe.id}/>, "gf-production-cluster-list-item");
            Simulate.click(div);

            expect(Global.navigation.main).toBe("production-cluster");
            expect(Global.navigation.sub).toBe("details");
            expect(Global.navigation.id).toBe(Europe.id);
        });

    });

});
