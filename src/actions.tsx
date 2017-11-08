import {Store} from "./store";
import {Inventory, Product} from "./state";

export function updateFrame(duration: number) {
    const { inventory, buildings } = Store.game;
    buildings.forEach(building => {

        building.products.forEach(p => updateProduct(duration, p, inventory));

    });
}

function updateProduct(duration: number, product: Product, inventory: Inventory) {
    const { time, worker, name, consumes } = product;
    const { values } = inventory;
    let rest = worker * duration;
    while (rest > 0) {
        if (time.current === 0) {
            const keys = Object.keys(consumes);
            const enough = keys.reduce((p, k) => p && values[k] >= consumes[k], true);
            if (enough) {
                keys.forEach(k => values[k] -= consumes[k])
            } else return;
        }
        time.current += rest;
        if (time.current > time.max) {
            rest = time.current - time.max;
            time.current = 0;
            values[name] = values[name] + 1 || 1
        } else {
            rest = 0
        }
    }
}

export function addWorker(product: Product) {
    if (Store.game.worker.current > 0) {
        Store.game.worker.current -= 1;
        product.worker += 1;
    }
}

export function removeWorker(product: Product) {
    if (Store.game.worker.current < Store.game.worker.max && product.worker > 0) {
        Store.game.worker.current += 1;
        product.worker -= 1;
    }
}
