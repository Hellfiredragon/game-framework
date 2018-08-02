import {createBuilding} from "game-framework";
import {Concrete, Copper, CopperOre, Iron, IronOre, ResearchPoints, Sand, Silicon, Steel, Tritium} from "./resource";

export const IronMine = createBuilding({
    name: "Iron Mine",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [IronOre.id]: 1,
    },
    energy: {
        consumes: 10
    }
});

export const Quarry = createBuilding({
    name: "Quarry",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [Sand.id]: 1,
    },
    energy: {
        consumes: 10
    }
});

export const CopperMine = createBuilding({
    name: "Copper Mine",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [IronOre.id]: 1,
    },
    energy: {
        consumes: 10
    }
});

export const IronBlastFurnace = createBuilding({
    name: "Iron Blast Furnace",
    category: "Processing",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [Iron.id]: 1,
    },
    consumes: {
        [IronOre.id]: 1,
    },
    energy: {
        consumes: 50
    }
});

export const ConcretePlant = createBuilding({
    name: "Concrete Plant",
    category: "Processing",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [Concrete.id]: 1,
    },
    consumes: {
        [IronOre.id]: 1,
        [Sand.id]: 1,
    },
    energy: {
        consumes: 20
    }
});

export const CopperBlastFurnace = createBuilding({
    name: "Copper Blast Furnace",
    category: "Processing",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [Copper.id]: 1,
    },
    consumes: {
        [CopperOre.id]: 1,
    },
    energy: {
        consumes: 50
    }
});

export const SiliconBlastFurnace = createBuilding({
    name: "Silicon Blast Furnace",
    category: "Processing",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [Silicon.id]: 1,
    },
    consumes: {
        [Sand.id]: 1,
    },
    energy: {
        consumes: 50
    }
});

export const InductionFurnace = createBuilding({
    name: "Induction Furnace",
    category: "Processing",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [Steel.id]: 1,
    },
    consumes: {
        [Iron.id]: 1,
    },
    energy: {
        consumes: 50
    }
});

export const PhotovoltaicPowerPlant = createBuilding({
    name: "Photovoltaic Power Plant",
    category: "Energy",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
        [Silicon.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
        [Silicon.id]: 1.1,
    },
    energy: {
        produces: 100
    }
});

export const TritiumMine = createBuilding({
    name: "Tritium Mine",
    category: "Resource",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [Tritium.id]: 1
    },
    energy: {
        consumes: 50
    }
});

export const TritiumLab = createBuilding({
    name: "Tritium Lab",
    category: "Research",
    cost: {
        [Iron.id]: 100,
        [Concrete.id]: 100,
    },
    costFactor: {
        [Iron.id]: 1.1,
        [Concrete.id]: 1.1,
    },
    produces: {
        [ResearchPoints.id]: 10
    },
    consumes: {
        [Tritium.id]: 1
    },
    energy: {
        consumes: 50
    }
});
