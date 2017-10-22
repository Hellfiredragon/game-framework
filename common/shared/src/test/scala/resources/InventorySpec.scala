package resources

import org.scalatest.FunSpec

class InventorySpec extends FunSpec {

    val steel = Resource(0, "Steel")
    val stone = Resource(1, "Stone")
    val wood = Resource(2, "Wood")
    val resources = Seq(steel, stone, wood)

    describe("An inventory") {
        describe("when constructing") {
            it("should add an initial amount") {
                val amount = 1 ~ wood
                val inventory = new Inventory(resources, 100, amount)
                assert(inventory(wood) == 1)
                assert(inventory(steel) == 0)
                assert(inventory(stone) == 0)
            }

            it("should add an even bigger initial amount") {
                val amount = Seq(10 ~ wood, 10 ~ steel)
                val inventory = new Inventory(resources, 100, amount: _*)
                assert(inventory(wood) == 10)
                assert(inventory(steel) == 10)
                assert(inventory(stone) == 0)
            }

            it("should cut a to big initial amount") {
                val amount = Seq(200 ~ wood, 200 ~ steel)
                val inventory = new Inventory(resources, 100, amount: _*)
                assert(inventory(wood) == 100)
                assert(inventory(steel) == 100)
                assert(inventory(stone) == 0)
            }
        }

        describe("with a single resource") {
            it("should add an amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood)
                val amount = 1 ~ wood
                assert(inventory add amount)
                assert(inventory(wood) == 11)
            }

            it("shouldn't add a too high amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood)
                val amount = 100 ~ wood
                assert(!(inventory add amount))
                assert(inventory(wood) == 10)
            }

            it("should remove a lower amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood)
                val amount = 1 ~ wood
                assert(inventory remove amount)
                assert(inventory(wood) == 9)
            }

            it("should remove the same amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood)
                val amount = 10 ~ wood
                assert(inventory remove amount)
                assert(inventory(wood) == 0)
            }

            it("shouldn't remove a higher amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood)
                val amount = 20 ~ wood
                assert(!(inventory remove amount))
                assert(inventory(wood) == 10)
            }
        }

        describe("with multiple resources") {
            it("should add an amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = 1 ~ wood
                assert(inventory add amount)
                assert(inventory(wood) == 11)
                assert(inventory(steel) == 10)
            }

            it("shouldn't add a too high amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = 100 ~ wood
                assert(!(inventory add amount))
                assert(inventory(wood) == 10)
                assert(inventory(steel) == 10)
            }

            it("should remove a lower amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = 1 ~ wood
                assert(inventory remove amount)
                assert(inventory(wood) == 9)
                assert(inventory(steel) == 10)
            }

            it("should remove the same amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = 10 ~ wood
                assert(inventory remove amount)
                assert(inventory(wood) == 0)
                assert(inventory(steel) == 10)
            }

            it("shouldn't remove a higher amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = 20 ~ wood
                assert(!(inventory remove amount))
                assert(inventory(wood) == 10)
                assert(inventory(steel) == 10)
            }
        }

        describe("with multiple resources and multiple changes") {
            it("should add an amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = Seq(1 ~ wood, 1 ~ steel)
                assert(inventory add (amount: _*))
                assert(inventory(wood) == 11)
                assert(inventory(steel) == 11)
            }

            it("shouldn't add a too high amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = Seq(100 ~ wood, 100 ~ steel)
                assert(!(inventory add (amount: _*)))
                assert(inventory(wood) == 10)
                assert(inventory(steel) == 10)
            }

            it("should remove a lower amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = Seq(1 ~ wood, 1 ~ steel)
                assert(inventory remove (amount: _*))
                assert(inventory(wood) == 9)
                assert(inventory(steel) == 9)
            }

            it("should remove the same amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = Seq(10 ~ wood, 10 ~ steel)
                assert(inventory remove (amount: _*))
                assert(inventory(wood) == 0)
                assert(inventory(steel) == 0)
            }

            it("shouldn't remove a higher amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel)
                val amount = Seq(20 ~ wood, 5 ~ steel)
                assert(!(inventory remove (amount: _*)))
                assert(inventory(wood) == 10)
                assert(inventory(steel) == 10)
            }
        }

        describe("with even more resources and multiple changes") {
            it("should add an amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel, 10 ~ stone)
                val amount = Seq(1 ~ wood, 1 ~ steel)
                assert(inventory add (amount: _*))
                assert(inventory(wood) == 11)
                assert(inventory(steel) == 11)
                assert(inventory(stone) == 10)
            }

            it("shouldn't add a too high amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel, 10 ~ stone)
                val amount = Seq(100 ~ wood, 100 ~ steel)
                assert(!(inventory add (amount: _*)))
                assert(inventory(wood) == 10)
                assert(inventory(steel) == 10)
                assert(inventory(stone) == 10)
            }

            it("should remove a lower amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel, 10 ~ stone)
                val amount = Seq(1 ~ wood, 1 ~ steel)
                assert(inventory remove (amount: _*))
                assert(inventory(wood) == 9)
                assert(inventory(steel) == 9)
                assert(inventory(stone) == 10)
            }

            it("should remove the same amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel, 10 ~ stone)
                val amount = Seq(10 ~ wood, 10 ~ steel)
                assert(inventory remove (amount: _*))
                assert(inventory(wood) == 0)
                assert(inventory(steel) == 0)
                assert(inventory(stone) == 10)
            }

            it("shouldn't remove a higher amount") {
                val inventory = new Inventory(resources, 100, 10 ~ wood, 10 ~ steel, 10 ~ stone)
                val amount = Seq(20 ~ wood, 5 ~ steel)
                assert(!(inventory remove (amount: _*)))
                assert(inventory(wood) == 10)
                assert(inventory(steel) == 10)
                assert(inventory(stone) == 10)
            }
        }
    }

}
