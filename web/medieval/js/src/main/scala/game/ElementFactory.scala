package game

import org.scalajs.dom._

object ElementFactory {

    def createDiv(className: String): html.Div = {
        val div = document.createElement("div").asInstanceOf[html.Div]
        div.setAttribute("class", className)
        div
    }

}
