package game

import org.scalajs.dom._

object Component {
    implicit def toElement(component: Component): Element = component.render()
}

trait Component {
    def render(): Element
}


case class BuildingDetails(name: String) extends Component {
    def render(): Element = {
        val div = ElementFactory.createDiv("building-details")
        div.textContent = name
        div
    }
}


case class BuildingIcon(name: String, onClick: (MouseEvent) => Unit) extends Component {
    def render(): Element = {
        val div = ElementFactory.createDiv("building-icon")
        div.textContent = name
        div.onclick = onClick
        div
    }
}


case class Window(header: String, children: Seq[Element] = Nil) extends Component {

    def render(): Element = {
        val div = ElementFactory.createDiv("window")

        val hDiv = ElementFactory.createDiv("header")
        hDiv.textContent = header

        val content = ElementFactory.createDiv("content")
        children.foreach(child => content.appendChild(child))

        div.appendChild(hDiv)
        div.appendChild(content)
        div
    }

}
