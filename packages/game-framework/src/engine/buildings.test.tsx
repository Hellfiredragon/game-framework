import {createBuilding, Building} from "./building";
import {Brick, Hydrogen, Iron, Stone, Wood} from "./resource.test";
import {Given, Then, When} from "../utils";
import {addBuilding, createProductionCluster} from "./production-cluster";
import {createGameLoop} from "../loop";

export const Lumberjack = createBuilding("Lumberjack", "Resource",
    {
        [Wood.id]: 10
    }, {
        [Wood.id]: 2
    }, {
        [Wood.id]: 1
    }, {},
    0, 0);
export const StoneWorker = createBuilding("Stone Worker", "Resource",
    {
        [Wood.id]: 10, [Stone.id]: 10
    }, {
        [Wood.id]: 2,
        [Stone.id]: 3
    }, {
        [Stone.id]: 1
    }, {},
    0, 0);
export const IronMine = createBuilding("Iron Mine", "Resource",
    {
        [Stone.id]: 10,
        [Iron.id]: 20
    }, {
        [Stone.id]: 3,
        [Iron.id]: 4
    }, {
        [Iron.id]: 1
    }, {},
    0, 0);

export const Bonfire = createBuilding("Bonfire", "Furniture",
    {}, {}, {}, { [Wood.id]: 1 },
    0, 0);
export const BrickFurnace = createBuilding("BrickFurnace", "Processing",
    {}, {}, { [Brick.id]: 1 }, { [Wood.id]: 1, [Stone.id]: 1 },
    0, 0);

export const HydrogenKatalysator = createBuilding("Hydrogen Catalysator", "Resource",
    {}, {}, { [Hydrogen.id]: 2 }, {},
    50, 0);

export const FuelCell = createBuilding("Fuel Cell", "Energy",
    {}, {}, {}, { [Hydrogen.id]: 1 },
    0, 100);
