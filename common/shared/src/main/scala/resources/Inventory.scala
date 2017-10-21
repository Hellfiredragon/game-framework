package resources

import scala.collection.mutable
import scala.collection.mutable.ArrayBuffer

class Inventory(init: Amount*) {

    var _content: mutable.Buffer[Amount] = init.toBuffer.sorted

    def content: mutable.Buffer[Amount] = _content

    def remove(amounts: Amount*): Boolean = {
        val sorted = amounts.sorted
        val changed = ArrayBuffer[Amount]()
        val it = sorted.iterator
        var current = it.next()
        _content.foreach(c => {
            if (c.resource == current.resource) {
                if (c.amount < current.amount) {
                    return false
                }
                changed += c - current
                if (it.hasNext) current = it.next()
            } else {
                changed += c
            }
        })
        _content = changed
        true
    }

}
