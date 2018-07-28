export interface Inventory {
    resources: number[];
}

export function addResources(inventory: Inventory, add: number[]) {
    for (let i in add) {
        inventory.resources[i] = (inventory.resources[i] || 0) + add[i];
    }
}

export function enoughResources(inventory: Inventory, remove: number[]): boolean {
    for (let i in remove) {
        if (remove[i] > inventory.resources[i] || inventory.resources[i] === undefined) return false;
    }
    return true;
}

export function removeResources(inventory: Inventory, remove: number[]): boolean {
    if (!enoughResources(inventory, remove)) return false;
    for (let i in remove) {
        inventory.resources[i] = (inventory.resources[i] || 0) - remove[i];
    }
    return true;
}
