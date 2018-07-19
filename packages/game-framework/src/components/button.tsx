import * as React from "react";
import * as classNames from "classnames";
import {Border} from "./border";

export interface ButtonProps {
    active: boolean
    action: () => void
    text: string
}

export class Button extends React.Component<ButtonProps> {

    lastActive = false;

    shouldComponentUpdate(nextProps: Readonly<ButtonProps>): boolean {
        return nextProps.active != this.lastActive;
    }

    render(): React.ReactNode {
        console.log("render");
        const { active, action, text } = this.props;
        this.lastActive = active;
        const cls = classNames(
            "gf-button", active && "gf-active"
        );

        return <div className={cls} onClick={!active ? action : undefined}>
            <Border/>
            {text}
        </div>
    }

}
