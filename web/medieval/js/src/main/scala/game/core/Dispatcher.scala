package game.core

import scala.collection.mutable

trait Action {

}

object Dispatcher {

    val handlers: mutable.Map[String, List[PartialFunction[_, Unit]]] = mutable.Map()

    def register[T <: Action](topic: String, handler: PartialFunction[T, Unit])
    : Unit = {
        val seq = handlers.getOrElseUpdate(topic, Nil)
        handlers.put(topic, handler :: seq)
    }

    def dispatch[T <: Action](topic: String, action: T): Unit = {
        handlers.getOrElse(topic, Nil) foreach { handler =>
            handler.asInstanceOf[PartialFunction[T, Unit]](action)
        }
    }

}

abstract class Dispatcher[T <: Action](topic: String) {
    def register(handler: PartialFunction[T, Unit]): Unit = {
        Dispatcher.register[T](topic, handler)
    }

    def dispatch(action: T): Unit = {
        Dispatcher.dispatch[T](topic, action)
    }
}
