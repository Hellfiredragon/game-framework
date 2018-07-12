import {GameState} from "./state/game-state";

export function createGameLoop(callback: (diff: number) => any): () => void {
    let lastTs = 0;
    const loop = () => {
        requestAnimationFrame((ts: number) => {
            const duration = 1000 / GameState.framesPerSecond;
            const diff = ts - lastTs;
            if(diff < duration) {
                loop();
            }else {
                callback(diff);
                lastTs = ts;
                loop();
            }
        });
    };

    return loop;
}
