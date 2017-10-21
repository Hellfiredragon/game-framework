package resources

import org.scalatest.FunSpec

class InventorySpec extends FunSpec {

    val wood = Resource("Wood")
    val steel = Resource("Steel")

    describe("An inventory") {
        it("should remove fast") {
            val rounds = 10000
            val init = for (i <- 0 until 100) yield Amount(Resource(i.toString), i * rounds * 2)
            val amount = for (i <- 0 until 10) yield Amount(Resource(i.toString), i)

            val inventory = new Inventory(init: _*)
            def action(): Unit = {
                assert(inventory remove (amount: _*))
            }

            for (_ <- 0 until rounds) action()
            val start = System.nanoTime()
            for (_ <- 0 until rounds) action()
            val duration = System.nanoTime() - start
            assert(duration / 1000 / 1000 < 100, "milliseconds")
            println(duration / 1000 / 1000)
        }

        describe("with a single resource") {
            it("should remove a lower amount") {
                val inventory = new Inventory(10 ~ wood)
                val amount = 1 ~ wood
                assert(inventory remove amount)
                assert(inventory.content == Seq(9 ~ wood))
            }

            it("should remove the same amount") {
                val inventory = new Inventory(10 ~ wood)
                val amount = 10 ~ wood
                assert(inventory remove amount)
                assert(inventory.content == Seq(0 ~ wood))
            }

            it("shouldn't remove a higher amount") {
                val inventory = new Inventory(10 ~ wood)
                val amount = 20 ~ wood
                assert(!(inventory remove amount))
                assert(inventory.content == Seq(10 ~ wood))
            }
        }

        describe("with multiple resources") {
            it("should remove a lower amount") {
                val inventory = new Inventory(10 ~ wood, 10 ~ steel)
                assert(inventory remove 1 ~ wood)
                assert(inventory.content == Seq(10 ~ steel, 9 ~ wood))
            }

            it("should remove the same amount") {
                val inventory = new Inventory(10 ~ wood, 10 ~ steel)
                assert(inventory remove 10 ~ wood)
                assert(inventory.content == Seq(10 ~ steel, 0 ~ wood))
            }

            it("shouldn't remove a higher amount") {
                val inventory = new Inventory(10 ~ wood, 10 ~ steel)
                assert(!(inventory remove 20 ~ wood))
                assert(inventory.content == Seq(10 ~ steel, 10 ~ wood))
            }
        }

        describe("with multiple resources and multiple removes") {
            it("should remove a lower amount") {
                val inventory = new Inventory(10 ~ wood, 10 ~ steel)
                assert(inventory remove(1 ~ wood, 1 ~ steel))
                assert(inventory.content == Seq(9 ~ steel, 9 ~ wood))
            }

            it("should remove the same amount") {
                val inventory = new Inventory(10 ~ wood, 10 ~ steel)
                assert(inventory remove(10 ~ wood, 10 ~ steel))
                assert(inventory.content == Seq(0 ~ steel, 0 ~ wood))
            }

            it("shouldn't remove a higher amount") {
                val inventory = new Inventory(10 ~ wood, 10 ~ steel)
                assert(!(inventory remove(20 ~ wood, 5 ~ steel)))
                assert(inventory.content == Seq(10 ~ steel, 10 ~ wood))
            }
        }
    }

}
