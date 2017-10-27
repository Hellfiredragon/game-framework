package test

import org.scalatest.FunSpec
import org.scalajs.dom
import dom.document

class TestSpec extends FunSpec{

    describe("A test") {

        it("should work") {
            def appendPar(targetNode: dom.Node, text: String): Unit = {
                val parNode = document.createElement("p")
                val textNode = document.createTextNode(text)
                parNode.appendChild(textNode)
                targetNode.appendChild(parNode)
            }

            appendPar(document.body, "Hello World")
        }

    }

}
