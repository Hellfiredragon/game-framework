package game

import org.scalajs.dom._


abstract class Stage(name: String) extends View {

    def renderStage(): Element

    def updateStage(): Unit = {}

    var page: Option[Element] = None

    def render(): Unit = {
        if (State.currentStage == name) {
            if (page.isEmpty) {
                val element = renderStage()
                document.body.appendChild(element)
                page = Some(element)
            } else {
                updateStage()
            }
        } else {
            page.foreach(p => document.body.removeChild(p))
            page = None
        }
    }

}


object ChooseStartBuildingStage {
    val Name = "choose-start-building-stage"
    val HeaderText = "Choose a building"
}

class ChooseStartBuildingStage extends Stage(ChooseStartBuildingStage.Name) {

    import ChooseStartBuildingStage._

    def handleChooseBuilding(building: String): MouseEvent => Unit = { _ =>
        State.buildings += building
        State.currentStage = MainStage.Name
    }

    def renderChooseBuildingIcon(building: String): BuildingIcon = {
        BuildingIcon(building, handleChooseBuilding(building))
    }

    def renderStage(): Element = {
        val page = ElementFactory.createDiv(Name)
        page.appendChild(Window(HeaderText, Seq(
            renderChooseBuildingIcon(Data.Buildings.blacksmith),
            renderChooseBuildingIcon(Data.Buildings.carpenter),
            renderChooseBuildingIcon(Data.Buildings.landlord)
        )))
        page
    }
}

object MainStage {
    val Name = "main-stage"
}

class MainStage extends Stage(MainStage.Name) {

    import MainStage._

    var children: Seq[View] = Nil

    def renderStage(): Element = {
        val page = ElementFactory.createDiv(Name)
        children = Seq(
            new BuildingsView(page)
        )
        page
    }

    override def updateStage(): Unit = {
        children.foreach(_.render())
    }
}
