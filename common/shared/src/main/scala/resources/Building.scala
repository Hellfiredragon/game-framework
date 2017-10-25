package resources

case class BuildingTemplate
(
    name: String,
    consumes: Seq[Amount],
    produces: Seq[Amount],
    upgradeBaseCost: Seq[Amount],
    upgradeFactors: Seq[Amount]
) {
    assert(upgradeBaseCost.size == upgradeFactors.size)
    for (i <- upgradeBaseCost.indices) {
        assert(upgradeBaseCost(i).resource == upgradeFactors(i).resource)
    }
}

class Building(val template: BuildingTemplate, var currentLevel: Int) {

    import template._

    var currentConsumption: Seq[Amount] = consumes.map(_ * currentLevel)
    var currentProduction: Seq[Amount] = produces.map(_ * currentLevel)

    def nextUpgradeCost(levels: Int): Seq[Amount] = for (i <- upgradeBaseCost.indices) yield {
        val base = upgradeFactors(i).amount
        val m = (for (exp <- currentLevel until (currentLevel + levels)) yield {
            Math.pow(base, exp)
        }).sum
        upgradeBaseCost(i) * m
    }

    def nextDowngradeRevenue(levels: Int): Seq[Amount] = for (i <- upgradeBaseCost.indices) yield {
        val base = upgradeFactors(i).amount
        val start = if (currentLevel - levels > 0) currentLevel - levels else 0
        val m = (for (exp <- start until currentLevel) yield {
            Math.pow(base, exp)
        }).sum
        upgradeBaseCost(i) * m
    }

    def upgrade(levels: Int, inventory: Inventory): Boolean = {
        if (levels == 0) return true
        if (inventory.remove(nextUpgradeCost(levels): _*)) {
            currentLevel = currentLevel + levels
            currentConsumption = consumes.map(_ * currentLevel)
            currentProduction = produces.map(_ * currentLevel)
            true
        } else {
            false
        }
    }

    def downgrade(levels: Int, inventory: Inventory): Boolean = {
        if (levels == 0) return true
        if (inventory.add(nextDowngradeRevenue(levels): _*)) {
            currentLevel = if (currentLevel - levels > 0) currentLevel - levels else 0
            currentConsumption = consumes.map(_ * currentLevel)
            currentProduction = produces.map(_ * currentLevel)
            true
        } else {
            false
        }
    }

}
