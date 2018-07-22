import * as React from "react";
import * as classNames from "classnames";
import {Button} from "../components/button";
import {Border} from "../components/border";

export class Main extends React.Component {

    render() {
        return <article className="gf-main">
            <Border/>
            <Button text={"Click Me"} action={() => console.log("clicked")} state={"normal"}/>
            <Button text={"I'm active"} action={() => console.log("clicked")} state={"active"}/>
            <Button text={"I'm disabled"} action={() => console.log("clicked")} state={"disabled"}/>
            <Button symbol={"plus"} state={"normal"} action={() => console.log("plus")}/>
            <Button symbol={"plus"} state={"active"} action={() => console.log("plus")}/>
            <Button symbol={"minus"} state={"disabled"} action={() => console.log("plus")}/>
        </article>
    }

}
