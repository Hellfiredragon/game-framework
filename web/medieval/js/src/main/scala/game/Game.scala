package game

import org.scalajs.dom._

import scala.collection.mutable.ArrayBuffer
import scala.language.implicitConversions

object Data {

    object Buildings {
        val carpenter = "Carpenter"
        val blacksmith = "Blacksmith"
        val landlord = "Landlord"
    }

}

trait Entity {

    def update(duration: Double): Unit

}

object State {

    var currentStage: String = ChooseStartBuildingStage.Name

    var buildings: ArrayBuffer[String] = ArrayBuffer()

}


object Game {

    val views = Seq(
        new ChooseStartBuildingStage(),
        new MainStage()
    )

    def main(args: Array[String]): Unit = {
        window.requestAnimationFrame(t => update(t))
    }

    var lastTime = 0.0

    def update(t: Double): Unit = {
        val duration = t - lastTime
        lastTime = t


        views.foreach(_.render())
        window.requestAnimationFrame(t => update(t))
    }

}
