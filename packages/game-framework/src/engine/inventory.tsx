export interface Inventory {
    items: number[];
}

export function addItems(inventory: Inventory, add: number[]) {
    for (let i in add) {
        inventory.items[i] = (inventory.items[i] || 0) + add[i];
    }
}

export function removeItems(inventory: Inventory, remove: number[]): boolean {
    for (let i in remove) {
        if (remove[i] > inventory.items[i] || inventory.items[i] === undefined) return false;
    }
    for (let i in remove) {
        inventory.items[i] = (inventory.items[i] || 0) - remove[i];
    }
    return true;
}
