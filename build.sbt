import sbtcrossproject.{CrossProject, CrossType}

val Versions = new {
    val scala = "2.12.4"
    val scalaTest = "3.0.0"
    val scalaJs = "0.9.1"
}

lazy val root = Project("game-framework", file("."))


lazy val common = CrossProject("common", file("./common"), CrossType.Full, JSPlatform, JVMPlatform)
    .settings(Seq(
        scalaVersion := Versions.scala,
        libraryDependencies ++= Seq(
            "org.scalatest" %%% "scalatest" % Versions.scalaTest % "test"

        )
    ))
    .jsSettings(Seq(
        jsEnv := new org.scalajs.jsenv.jsdomnodejs.JSDOMNodeJSEnv(),
        libraryDependencies ++= Seq(
            "org.scala-js" %%% "scalajs-dom" % Versions.scalaJs
        )
    ))

lazy val commonJS = common.js
lazy val commonJVM = common.jvm

lazy val webMedieval = CrossProject("medieval", file("./web/medieval"), CrossType.Full, JSPlatform)
    .settings(Seq(
        scalaVersion := Versions.scala,
        libraryDependencies ++= Seq(
            "org.scalatest" %%% "scalatest" % Versions.scalaTest % "test"
        )
    ))
    .jsSettings(Seq(
        jsEnv := new org.scalajs.jsenv.jsdomnodejs.JSDOMNodeJSEnv(),
        scalaJSUseMainModuleInitializer := true,
        libraryDependencies ++= Seq(
            "org.scala-js" %%% "scalajs-dom" % Versions.scalaJs
        )
    ))
    .dependsOn(common)

lazy val webMedievalJS = webMedieval.js
