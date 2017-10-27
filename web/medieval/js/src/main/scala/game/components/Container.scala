package game.components

import game.core.{CachableComponent, Component}
import org.scalajs.dom.html.Div
import org.scalajs.dom.{Element, document}

abstract class Container(className: String, children: Seq[Component] = Nil)
    extends CachableComponent {

    override def renderCache(): Element = {
        val div: Div = document.createElement("div").asInstanceOf[Div]
        div.setAttribute("class", className)
        children.foreach(child => div.appendChild(child.render()))
        div
    }

    def update(): Unit = {
        children.foreach(_.update())
    }
}
