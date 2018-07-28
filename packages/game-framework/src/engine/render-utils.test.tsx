import {Given, Then, When} from "../utils";
import {formatNumber} from "./render-utils";

Given("the format number function", () => {

    When("called with a number", () => {

        [
            { given: 0.1, expected: "0.1" },
            { given: 1, expected: "1.0" },
            { given: 10, expected: "10.0" },
            { given: 10 / 6, expected: "1.7" },
            { given: 100, expected: "100.0" },
            { given: 900, expected: "900.0" },
            { given: 901, expected: "0.9K" },
            { given: 1000, expected: "1.0K" },
            { given: 900000, expected: "900.0K" },
            { given: 901000, expected: "0.9M" },
            { given: 1000000, expected: "1.0M" },
            { given: 1300000, expected: "1.3M" }
        ].forEach(param => {
            Then(`it should format ${param.given} as ${param.expected}`, () => {
                expect(formatNumber(param.given)).toBe(param.expected);
            });
        });

    });

});
