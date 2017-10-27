package game.components

import game.State
import game.core.{Action, CachableComponent, Dispatcher}
import org.scalajs.dom.html.Div
import org.scalajs.dom.{Element, document}


object SwitchToPage extends Dispatcher[SwitchToPage]("SwitchToPage") {
    register {
        case SwitchToPage(name) =>
            State.activePage = name
    }

    def switch(page: String): Unit = dispatch(SwitchToPage(page))
}

case class SwitchToPage(name: String) extends Action

case class MenuItem(name: String, startActive: Boolean = false) extends CachableComponent {
    private var active = false

    private def className = if (active) "menu-item active" else "menu-item"

    override def renderCache(): Element = {
        val div: Div = document.createElement("div").asInstanceOf[Div]
        div.setAttribute("class", className)
        div.textContent = name
        div.onclick = (_) => SwitchToPage.switch(name)
        div
    }

    override def update(): Unit = {
        val newValue = State.activePage == name
        if (active != newValue) {
            active = newValue
            cache foreach { div =>
                div.setAttribute("class", className)
            }
        }
    }
}
