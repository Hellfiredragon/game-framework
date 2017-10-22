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

    case class Resource(i: Int, name: String)

    case class Amount(resource: Resource, amount: Double) {

        def +(other: Amount): Amount = if (other.resource == resource) {
            (amount + other.amount) ~ resource
        } else {
            this
        }

        def -(other: Amount): Amount = if (other.resource == resource) {
            (amount - other.amount) ~ resource
        } else {
            this
        }

        def <(other: Amount): Boolean = if (other.resource == resource) {
            other.amount < amount
        } else {
            false
        }

    }

}
