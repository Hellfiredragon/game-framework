package game.components

case class GameWindow() extends Container("game-window", Seq(
    GameMenu()
))

case class GameMenu() extends Container("game-menu", Seq(
    MenuItem("Gebäude"),
    MenuItem("Forschung")
))
