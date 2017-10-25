package resources

import org.scalactic.{Equality, TolerantNumerics}
import org.scalatest.FunSpec

class DefaultSpec extends FunSpec {
    implicit val doubleEq: Equality[Double] = TolerantNumerics.tolerantDoubleEquality(1)
}
