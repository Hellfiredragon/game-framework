import sbtcrossproject.{CrossType, crossProject, CrossProject}

val scalaV = "2.12.4"

lazy val root = Project("game-framework", file("."))

lazy val common = CrossProject("common", file("./common"), CrossType.Full, JSPlatform, JVMPlatform)
    .settings(Seq(
        scalaVersion := scalaV,
        libraryDependencies ++= Seq(
            "org.scalatest" %%% "scalatest" % "3.0.0" % "test"
        )
    ))

lazy val commonJS = common.js
lazy val commonJVM = common.jvm

lazy val webMedieval = Project("medieval", file("./web/medieval"), settings = Seq(
    scalaVersion := scalaV
)).dependsOn(commonJVM)
