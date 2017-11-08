import {Store} from "./store";
import {AllBuildings, AllProducts, Building, GameStages, Product, StartingGroup} from "./state";

export function updateFrame(duration: number) {
    const { buildings } = Store.game;
    buildings.forEach(building => {
        building.products.forEach(products =>
            updateProduct(duration, products, building)
        );
    });
}

function updateProduct(duration: number, product: Product, building: Building): void {
    const { time, worker, id, consumes } = product;
    const { inventory } = building;
    let rest = worker * duration;
    while (rest > 0) {
        if (time.current === 0) {
            const enough = consumes.reduce((p, amount, productId) =>
                p && inventory[productId] >= amount, true);
            if (enough) {
                consumes.forEach((amount, productId) => inventory[productId] -= amount)
            } else return;
        }
        time.current += rest;
        if (time.current > time.max) {
            rest = time.current - time.max;
            time.current = 0;
            inventory[id] = (inventory[id] || 0) + product.produces;
        } else {
            rest = 0;
        }
    }
}

export function updateTick() {
    const { buildings } = Store.game;
    buildings.forEach(building => {
        building.routes.forEach((route, targetId) =>
            updateRouteTick(route, building, AllBuildings[targetId])
        );
        building.sales.forEach((seller, productId) =>
            sellProduct(seller, productId, building.inventory)
        );
    });
}

function updateRouteTick(route: number[], building: Building, target: Building): void {
    route.forEach((transfer, productId) => {
        if (building.inventory[productId] > transfer) {
            building.inventory[productId] -= transfer;
            target.inventory[productId] = (target.inventory[productId] || 0) + transfer;
        } else {
            target.inventory[productId] = (target.inventory[productId] || 0) + building.inventory[productId];
            building.inventory[productId] = 0;
        }
    })
}

function sellProduct(seller: number, productId: number, inventory: number[]) {
    const { game } = Store;
    const count = inventory[productId];
    if (count >= seller) {
        inventory[productId] -= seller;
        game.gold += AllProducts[productId].value * seller;
    } else if (count > 0) {
        inventory[productId] = 0;
        game.gold += AllProducts[productId].value * count;
    }
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

export function addSeller(building: Building, productId: number) {
    const { seller } = Store.game;
    if (seller.current > 0) {
        seller.current -= 1;
        building.sales[productId] = (building.sales[productId] || 0) + 1;
    }
}

export function removeSeller(building: Building, productId: number) {
    const { seller } = Store.game;
    if (seller.current < seller.max && building.sales[productId] > 0) {
        seller.current += 1;
        building.sales[productId] -= 1;
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
