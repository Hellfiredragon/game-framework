import * as React from "react";
import {findComponentWithClass, findComponentWithType, Given, obj2Arr, scryComponentsWithType, Then, When} from "../utils";
import {Global} from "../engine/global";
import {Europe} from "../engine/production-cluster.test";
import {BuildingList, BuildingListItem} from "./building-list";
import {IronMine} from "../engine/building.test";
import {BuildingCategories, getBuildingsByCategory} from "../engine/building";
import {ResourceList, ResourceListItem} from "./resource-list";
import {Iron} from "../engine/resource.test";

Given("a resource list", () => {

    When(`given a list of resources`, () => {

        Then(`it should render the resources`, () => {
            const items = scryComponentsWithType(<ResourceList resources={IronMine.cost}/>, ResourceListItem);

            expect(items.map(x => x.props.id)).toEqual(IronMine.cost.map((amount, id) => id).filter(x => x));
            expect(items.map(x => x.props.amount)).toEqual(IronMine.cost.map((amount, id) => amount).filter(x => x));
        });

    });

});

Given("a resource list item", () => {

    When("it is rendered with a resource id", () => {

        [
            { resource: Iron, amount: 10, expected: "Iron: 10.0" },
            { resource: Iron, amount: 900, expected: "Iron: 900.0" },
            { resource: Iron, amount: 901, expected: "Iron: 0.9K" }

        ].forEach(param => {
            Then("it should render the resource", () => {
                const div = findComponentWithClass<HTMLDivElement>(<ResourceListItem id={param.resource.id} amount={param.amount}/>, "gf-resource-list-item");

                expect(div.textContent).toBe(param.expected);
            });
        });

    });

});
