package game

import game.components.{GameWindow, MenuItem}
import org.scalajs.dom._
import org.scalajs.dom.html.Div

object State {

    var activePage: String = _

}

object Game {

    val gameWindow = GameWindow()

    def main(args: Array[String]): Unit = {
        document.body.appendChild(gameWindow.render())
        window.requestAnimationFrame(_ => update())
    }

    def update(): Unit = {
        gameWindow.update()
        window.requestAnimationFrame(_ => update())
    }

}
