package game

import org.scalajs.dom._

import scala.collection.mutable.ArrayBuffer

trait View {

    def render(): Unit

}

abstract class CacheView(parent: Element) extends View {

    def renderView(): Element

    def updateView(): Unit

    var rendered: Option[Element] = None

    def render(): Unit = {
        if (rendered.isEmpty) {
            val view = renderView()
            parent.appendChild(view)
            rendered = Some(view)
        } else {
            updateView()
        }
    }

}


class BuildingsView(parent: Element) extends CacheView(parent) {
    var buildings: ArrayBuffer[String] = ArrayBuffer()
    var container: Option[Element] = None

    override def renderView(): Element = {
        val div = ElementFactory.createDiv("buildings")
        container = Some(div)
        updateView()
        div
    }

    override def updateView(): Unit = {
        if (buildings != State.buildings) {
            buildings = State.buildings
            container.foreach(c => {
                State.buildings.foreach(building => {
                    c.appendChild(BuildingDetails(building))
                })
            })
        }
    }
}
