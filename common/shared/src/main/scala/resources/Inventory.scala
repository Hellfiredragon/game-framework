package resources

class Inventory(val resources: Seq[Resource], val maxSize: Int, init: Amount*) {

    private val _content = new Array[Double](resources.size)
    init.foreach(a => _content(a.resource.i) = if (a.amount > maxSize) maxSize else a.amount)

    def content: Seq[Amount] = resources.map(r => _content(r.i) ~ r)

    def apply(resource: Resource): Double = _content(resource.i)

    def add(amounts: Amount*): Boolean = {
        var it = amounts.iterator
        while (it.hasNext) {
            val a = it.next()
            if (_content(a.resource.i) + a.amount > maxSize) return false
        }
        it = amounts.iterator
        while (it.hasNext) {
            val a = it.next()
            _content(a.resource.i) = _content(a.resource.i) + a.amount
        }
        true
    }

    def remove(amounts: Amount*): Boolean = {
        var it = amounts.iterator
        while (it.hasNext) {
            val a = it.next()
            if (_content(a.resource.i) - a.amount < 0) return false
        }
        it = amounts.iterator
        while (it.hasNext) {
            val a = it.next()
            _content(a.resource.i) = _content(a.resource.i) - a.amount
        }
        true
    }

}
