import scala.language.implicitConversions

package object resources {

    implicit val resourceOrdering: Ordering[Resource] = Ordering.by[Resource, String](_.name)
    implicit val amountOrdering: Ordering[Amount] = Ordering.by[Amount, String](_.resource.name)

    implicit def numberToRich(number: Short): RichNumber = RichNumber(number)

    implicit def numberToRich(number: Int): RichNumber = RichNumber(number)

    implicit def numberToRich(number: Long): RichNumber = RichNumber(number)

    implicit def numberToRich(number: Float): RichNumber = RichNumber(number)

    implicit def numberToRich(number: Double): RichNumber = RichNumber(number)

    case class RichNumber(number: Number) {

        @inline
        def ~(resource: Resource): Amount = Amount(resource, number.floatValue())

    }

    case class Resource(i: Int, name: String) {
        override def toString: String = name
    }

    case class Amount(resource: Resource, amount: Double) {
        def *(factor: Double) = Amount(resource, amount * factor)

        override def toString: String = amount + " " + resource.toString
    }

}
