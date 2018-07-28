import * as React from "react";
import * as ReactTestUtils from 'react-dom/test-utils';
import {Simulate} from "react-dom/test-utils";
import {findComponentWithClass, findComponentWithType, Given, scryComponentsWithType, Then, When} from "../utils";
import {createProductionCluster} from "..";
import {ProductionClusterList, ProductionClusterListItem} from "./production-cluster-list";
import {Global} from "../engine/global";
import {Asia, Europe, Russia} from "../engine/production-cluster.test";
import {BuildingList, BuildingListItem, ResourceList, ResourceListItem} from "./building-list";
import {IronMine, Lumberjack, StoneWorker, CoalMine, HydrogenKatalysator, BrickFurnace, Bonfire} from "../engine/buildings.test";
import {BuildingCategories, getBuildingsByCategory} from "../engine/building";
import {getResource} from "../engine/resource";

Given("a building list", () => {

    BuildingCategories.forEach(category => {
        When(`${category} buildings selected`, () => {

            Then(`it should render ${category} buildings`, () => {
                Global.navigation.buildingCategory = category;
                const items = scryComponentsWithType(<BuildingList clusterId={Europe.id}/>, BuildingListItem);

                expect(items.map(x => x.props.buildingId)).toEqual(getBuildingsByCategory(category).map(x => x.id));
            });

        });
    });

});

Given("a building list item", () => {

    When("it is rendered with a building id", () => {

        Then("it should render the building", () => {
            const item = findComponentWithType(<BuildingListItem clusterId={Europe.id} buildingId={IronMine.id}/>, ResourceList);

            expect(item.props.resources).toEqual(IronMine.cost);
        });

    });

});
