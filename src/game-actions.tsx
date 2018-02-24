import {GameState} from "./game-state";
import {action} from "mobx";

export const startBoost = action(function () {
    const state = GameState();
    if (state.boostSec > 0) {
        state.boostActive = true;
    }
});

export const stopBoost = action(function () {
    const state = GameState();
    state.boostActive = false;
});

export const chooseTab = action(function (tabNumber: number) {
    const state = GameState();
    state.selectedTab = tabNumber;
});
