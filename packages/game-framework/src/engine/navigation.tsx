import {Global} from "./global";
import {BuildingCategory} from "./building";

export interface Navigation {
    main: "production-cluster" | "research";
    sub: "overview" | "details";
    buildingCategory: BuildingCategory;
    id: number;
}

export type Pages =
    | "production-cluster/overview"
    | "production-cluster/item"
    | "production-cluster/item/Resource"
    | "production-cluster/item/Processing"
    | "production-cluster/item/Energy"
    | "production-cluster/item/Research"
    | "research/overview"

export function showProductionClusterList() {
    Global.navigation.main = "production-cluster";
    Global.navigation.sub = "overview";
}

export function showProductionCluster(id: number) {
    Global.navigation.main = "production-cluster";
    Global.navigation.sub = "details";
    Global.navigation.id = id;
}

export function showBuildingList(buildingCategory: BuildingCategory) {
    Global.navigation.main = "production-cluster";
    Global.navigation.sub = "details";
    Global.navigation.buildingCategory = buildingCategory;
}

export function showResearchList() {
    Global.navigation.main = "research";
    Global.navigation.sub = "overview";
}
