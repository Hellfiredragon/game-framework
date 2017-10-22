package resources

class Inventory(val resources: Seq[Resource], val maxSize: Int, init: Amount*) {

    val content = new Array[Double](resources.size)
    init.foreach(a => content(a.resource.i) = if (a.amount > maxSize) maxSize else a.amount)

    def apply(resource: Resource): Double = content(resource.i)

    def add(amounts: Amount*): Boolean = {
        var it = amounts.iterator
        while (it.hasNext) {
            val a = it.next()
            if (content(a.resource.i) + a.amount > maxSize) return false
        }
        it = amounts.iterator
        while (it.hasNext) {
            val a = it.next()
            content(a.resource.i) = content(a.resource.i) + a.amount
        }
        true
    }

    def remove(amounts: Amount*): Boolean = {
        var it = amounts.iterator
        while (it.hasNext) {
            val a = it.next()
            if (content(a.resource.i) - a.amount < 0) return false
        }
        it = amounts.iterator
        while (it.hasNext) {
            val a = it.next()
            content(a.resource.i) = content(a.resource.i) - a.amount
        }
        true
    }

}
