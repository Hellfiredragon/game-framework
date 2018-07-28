import * as React from "react";
import * as classNames from "classnames";
import {Button} from "../components/button";
import {Border} from "../components/border";
import {ProductionClusterList} from "./production-cluster-list";
import {Global} from "../engine/global";
import {ProductionClusterView} from "./production-cluster-view";

export class Main extends React.Component {

    render() {
        let body: JSX.Element;
        switch (Global.navigation.page) {
            case "production-cluster-view":
                body = <ProductionClusterView id={Global.navigation.id}/>
                break;
            default:
                body = <ProductionClusterList/>;
        }

        return <article className="gf-main">
            {body}
        </article>
    }

}
