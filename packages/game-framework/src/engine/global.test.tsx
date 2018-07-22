import {Given, Then, When} from "../utils";
import {configure, Global} from "./global";

Given("the global state", () => {

    When("the game configure it", () => {

        Then("it should contains the correct values", () => {

            configure({
                framesPerSecond: 45,
                saleFactor: 0.9
            });

            expect(Global.framesPerSecond).toBe(45);
            expect(Global.saleFactor).toBe(0.9);

        });

    });

});
