import {Given, Then, When} from "../utils";
import {configure, Defaults, Global} from "./global";

Given("the global state", () => {

    When("the game configure it", () => {

        Then("it should contains the correct values", () => {

            configure({
                framesPerSecond: 45,
                revenueFactor: 0.9
            });

            expect(Global.framesPerSecond).toBe(45);
            expect(Global.revenueFactor).toBe(0.9);

            configure(Defaults);

            expect(Global.framesPerSecond).toBe(30);
            expect(Global.revenueFactor).toBe(0.5);

        });

    });

});
