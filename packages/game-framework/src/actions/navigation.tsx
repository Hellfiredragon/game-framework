import {GameState} from "../state/game-state";

export function goToPage(id: string) {
    console.log(`go to page to '${id}'`);
    GameState.nav.page = id;
}
