import * as React from "react";
import * as ReactTestUtils from 'react-dom/test-utils';
import {Simulate} from "react-dom/test-utils";
import {findComponentWithClass, Given, scryComponentsWithType, Then, When} from "../utils";
import {createProductionCluster} from "..";
import {ProductionClusterList, ProductionClusterListItem} from "./production-cluster-list";
import {Global} from "../engine/global";
import {Asia, Europe, Russia} from "../engine/production-cluster.test";
import {BuildingList, BuildingListItem} from "./building-list";
import {IronMine, Lumberjack, StoneWorker, CoalMine, HydrogenKatalysator, BrickFurnace, Bonfire} from "../engine/buildings.test";
import {BuildingCategories, getBuildingsByCategory} from "../engine/building";

Given("a building list", () => {

    BuildingCategories.forEach(category => {
        When(`${category} buildings selected`, () => {

            Then(`it should render ${category} buildings`, () => {
                Global.navigation.buildingCategory = category;
                const items = scryComponentsWithType(<BuildingList/>, BuildingListItem);

                expect(items.map(x => x.props.id)).toEqual(getBuildingsByCategory(category).map(x => x.id));
            });

        });
    });

});
