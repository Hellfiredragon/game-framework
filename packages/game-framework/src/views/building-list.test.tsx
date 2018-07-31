import * as React from "react";
import {findComponentWithType, Given, scryComponentsWithType, Then, When} from "../utils";
import {Global} from "../engine/global";
import {Europe} from "../engine/production-cluster.test";
import {BuildingList, BuildingListItem, CostList} from "./building-list";
import {IronMine} from "../engine/building.test";
import {BuildingCategories, getBuildingsByCategory} from "../engine/building";

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
            const item = findComponentWithType(<BuildingListItem clusterId={Europe.id} buildingId={IronMine.id} enoughResources={true}/>, CostList);

            expect(item.props.resources).toEqual(IronMine.cost);
        });

    });

});
