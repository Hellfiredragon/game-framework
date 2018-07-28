import {Global} from "./global";

export function showProductionClusterList() {
    Global.navigation.page = "production-cluster/overview";
}

export function showProductionCluster(id: number) {
    Global.navigation.page = "production-cluster/item";
    Global.navigation.id = id;
}

export function showResearchList() {
    Global.navigation.page = "research/overview"
}
