package resources

class BuildingSpec extends DefaultSpec {

    val steel = Resource(0, "Steel")
    val stone = Resource(1, "Stone")
    val wood = Resource(2, "Wood")
    val resources = Seq(steel, stone, wood)
    val template = BuildingTemplate("template", Seq(1 ~ wood), Seq(1 ~ steel), Seq(10 ~ wood, 20 ~ steel), Seq(1.2 ~ wood, 1.4 ~ steel))

    describe("A building") {
        describe("when creating a new instance") {
            it("should have no consumption and production") {
                val building = new Building(template, 0)
                assert(building.currentLevel == 0)
                assert(building.currentConsumption == Seq(0 ~ wood))
                assert(building.currentProduction == Seq(0 ~ steel))
            }

            it("should have a consumption on level 1") {
                val building = new Building(template, 1)
                assert(building.currentLevel == 1)
                assert(building.currentConsumption == Seq(1 ~ wood))
                assert(building.currentProduction == Seq(1 ~ steel))
            }
        }

        describe("should have upgrade cost") {
            it("for level 1") {
                val building = new Building(template, 0)
                val cost = building.nextUpgradeCost(1)
                assert(cost.head.amount === 10.0)
                assert(cost.last.amount === 20.0)
            }

            it("for level 2") {
                val building = new Building(template, 1)
                val cost = building.nextUpgradeCost(1)
                assert(cost.head.amount === 12.0)
                assert(cost.last.amount === 28.0)
            }

            it("for 5 levels") {
                val building = new Building(template, 0)
                val cost = building.nextUpgradeCost(5)
                assert(cost.head.amount === 74.0)
                assert(cost.last.amount === 218.0)
            }

            it("for 5 levels from 5") {
                val building = new Building(template, 5)
                val cost = building.nextUpgradeCost(5)
                assert(cost.head.amount === 185.0)
                assert(cost.last.amount === 1177.0)
            }

            it("for 10 levels from 0") {
                val building = new Building(template, 0)
                val cost = building.nextUpgradeCost(10)
                assert(cost.head.amount === 259.0)
                assert(cost.last.amount === 1396.0)
            }
        }

        describe("should have downgrade revenue") {
            it("at level 1") {
                val building = new Building(template, 1)
                val cost = building.nextDowngradeRevenue(1)
                assert(cost.head.amount === 10.0)
                assert(cost.last.amount === 20.0)
            }

            it("at level 2") {
                val building = new Building(template, 2)
                val cost = building.nextDowngradeRevenue(1)
                assert(cost.head.amount === 12.0)
                assert(cost.last.amount === 28.0)
            }

            it("for 10 levels at level 5") {
                val building = new Building(template, 5)
                val cost = building.nextDowngradeRevenue(10)
                assert(cost.head.amount === 74.0)
                assert(cost.last.amount === 218.0)
            }

            it("for 10 levels at level 10") {
                val building = new Building(template, 10)
                val cost = building.nextDowngradeRevenue(10)
                assert(cost.head.amount === 259.0)
                assert(cost.last.amount === 1396.0)
            }
        }

        describe("when upgrading") {
            it("should remove resources from inventory for 1 level") {
                val inventory = new Inventory(resources, 1000, 100 ~ wood, 100 ~ steel)
                val building = new Building(template, 0)
                building.upgrade(1, inventory)
                assert(building.currentLevel == 1)
                assert(inventory(wood) === 90.0)
                assert(inventory(steel) === 80.0)
                assert(building.currentConsumption == Seq(1 ~ wood))
                assert(building.currentProduction == Seq(1 ~ steel))
            }

            it("should remove resources from inventory for 5 level") {
                val inventory = new Inventory(resources, 1000, 1000 ~ wood, 1000 ~ steel)
                val building = new Building(template, 0)
                building.upgrade(5, inventory)
                assert(building.currentLevel == 5)
                assert(inventory(wood) === 925.0)
                assert(inventory(steel) === 781.0)
                assert(building.currentConsumption == Seq(5 ~ wood))
                assert(building.currentProduction == Seq(5 ~ steel))
            }

            it("shouldn't remove resources from inventory for 5 level") {
                val inventory = new Inventory(resources, 1000, 100 ~ wood, 100 ~ steel)
                val building = new Building(template, 0)
                building.upgrade(5, inventory)
                assert(building.currentLevel == 0)
                assert(inventory(wood) === 100.0)
                assert(inventory(steel) === 100.0)
                assert(building.currentConsumption == Seq(0 ~ wood))
                assert(building.currentProduction == Seq(0 ~ steel))
            }

            it("should remove resources from inventory for 5 level from 5") {
                val inventory = new Inventory(resources, 10000, 10000 ~ wood, 10000 ~ steel)
                val building = new Building(template, 5)
                building.upgrade(5, inventory)
                assert(building.currentLevel == 10)
                assert(inventory(wood) === 9814.0)
                assert(inventory(steel) === 8823.0)
                assert(building.currentConsumption == Seq(10 ~ wood))
                assert(building.currentProduction == Seq(10 ~ steel))
            }
        }

        describe("when downgrading") {
            it("should add resources to inventory for 1 level") {
                val inventory = new Inventory(resources, 1000, 100 ~ wood, 100 ~ steel)
                val building = new Building(template, 1)
                building.downgrade(1, inventory)
                assert(inventory(wood) === 110.0)
                assert(inventory(steel) === 120.0)
                assert(building.currentConsumption == Seq(0 ~ wood))
                assert(building.currentProduction == Seq(0 ~ steel))
            }

            it("should add resources to inventory for 5 level") {
                val inventory = new Inventory(resources, 10000, 1000 ~ wood, 1000 ~ steel)
                val building = new Building(template, 5)
                building.downgrade(5, inventory)
                assert(inventory(wood) === 1075.0)
                assert(inventory(steel) === 1219.0)
                assert(building.currentConsumption == Seq(0 ~ wood))
                assert(building.currentProduction == Seq(0 ~ steel))
            }

            it("should add resources for 1 level to inventory for 5 level from 1") {
                val inventory = new Inventory(resources, 10000, 1000 ~ wood, 1000 ~ steel)
                val building = new Building(template, 1)
                building.downgrade(5, inventory)
                assert(inventory(wood) === 1010.0)
                assert(inventory(steel) === 1020.0)
                assert(building.currentConsumption == Seq(0 ~ wood))
                assert(building.currentProduction == Seq(0 ~ steel))
            }
        }
    }

}
