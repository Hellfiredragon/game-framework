package game.core

import org.scalajs.dom.Element

trait Component {
    def render(): Element

    def update(): Unit
}

trait CachableComponent extends Component {
    protected var cache: Option[Element] = None

    def renderCache(): Element

    def render(): Element = cache match {
        case None =>
            val node = renderCache()
            cache = Some(node)
            node
        case Some(node) => node
    }
}
