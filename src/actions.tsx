import {Store} from "./store";
import {AllBuildings, Building, GameStages, Product, StartingGroup} from "./state";

export function updateFrame(duration: number) {
    const { buildings } = Store.game;
    buildings.forEach(building => {
        building.products.forEach(products =>
            updateProduct(duration, products, building)
        );
        building.routes.forEach((route, targetId) =>
            updateRoute(duration, route, building, AllBuildings[targetId])
        );
    });
}

function updateProduct(duration: number, product: Product, building: Building): void {
    const { time, worker, id, consumes } = product;
    const { inventory } = building;
    let rest = worker * duration;
    while (rest > 0) {
        if (time.current === 0) {
            const enough = consumes.reduce((p, k) => p && inventory[k] >= consumes[k], true);
            if (enough) {
                consumes.forEach(k => inventory[k] -= consumes[k])
            } else return;
        }
        time.current += rest;
        if (time.current > time.max) {
            rest = time.current - time.max;
            time.current = 0;
            inventory[id] = inventory[id] + 1 || 1
        } else {
            rest = 0
        }
    }
}

function updateRoute(duration: number, route: number[], building: Building, target: Building): void {

    route.forEach((count, productId) => {
        const transfer = count * duration;
        if (building.inventory[productId] > transfer) {
            building.inventory[productId] -= transfer;
            target.inventory[productId] = (target.inventory[productId] || 0) + transfer;
        } else {
            target.inventory[productId] = (target.inventory[productId] || 0) + building.inventory[productId];
            building.inventory[productId] = 0;
        }
    })
}

export function addWorker(product: Product) {
    const { worker } = Store.game;
    if (worker.current > 0) {
        worker.current -= 1;
        product.worker += 1;
    }
}

export function removeWorker(product: Product) {
    const { worker } = Store.game;
    if (worker.current < worker.max && product.worker > 0) {
        worker.current += 1;
        product.worker -= 1;
    }
}

export function addCart(building: Building, targetId: number, productId: number) {
    const { carts } = Store.game;
    if (carts.current > 0) {
        carts.current -= 1;
        const route = building.routes[targetId] || [];
        route[productId] = route[productId] + 1 || 1;
        building.routes[targetId] = route;
    }
}

export function removeCart(building: Building, targetId: number, productId: number) {
    const { carts } = Store.game;
    const route = building.routes[targetId] || {};
    const usedCarts = route[productId] || 0;
    if (carts.current < carts.max && usedCarts > 0) {
        carts.current += 1;
        route[productId] = usedCarts - 1;
    }
}

export function build(building: Building) {
    const { game } = Store;
    const { buildings, buildableBuildings } = Store.game;
    const index = buildableBuildings.indexOf(building);
    if (index > -1 && game.gold > building.cost) {
        game.gold -= building.cost;
        buildings.push(building);
        buildableBuildings.splice(index, 1);
    }
}

export function chooseStartBuilding(group: StartingGroup) {
    const { resources, building } = group;
    resources.forEach(build);
    build(building);
    Store.game.stage = GameStages.Main;
}
