import * as React from "react";
import * as classNames from "classnames";
import {GameState} from "../state/game-state";
import {goToPage} from "../actions/navigation";

export interface MenuItemProps {
    id: string
    text: string
}

export class MenuItem extends React.Component<MenuItemProps> {

    onClick = () => {
        goToPage(this.props.id);
    };

    render() {
        const cls = classNames(
            "gf-menu-item",
            GameState.nav.page == this.props.id && "gf-active"
        );

        return <section className={cls} onClick={this.onClick}>
            {this.props.text}
        </section>
    }
}

export class Menu extends React.Component {

    render() {
        return <article className="gf-menu">
            <MenuItem id={"buildings"} text={"Buildings"}/>
            <MenuItem id={"research"} text={"Research"}/>
        </article>
    }

}

export class Main extends React.Component {

    render() {
        return <article className="gf-main">
            <Menu/>
        </article>;
    }

}
