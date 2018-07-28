import {Global} from "./engine/global";
import {MS_PER_UPDATE} from "./engine/constants";

export function createGameLoop(update: () => void, render: () => void): () => void {
    let previous = 0;
    let lag = 0.0;

    const callback = (current: number) => {
        const minDuration = 1000 / Global.framesPerSecond;
        const elapsed = current - previous;
        if (elapsed >= minDuration) {
            previous = current;
            lag += elapsed;
            while (lag >= MS_PER_UPDATE) {
                update();
                lag -= MS_PER_UPDATE;
            }
            render();
        }
        loop();
    };

    const loop = () => {
        requestAnimationFrame(callback);
    };

    return loop;
}
