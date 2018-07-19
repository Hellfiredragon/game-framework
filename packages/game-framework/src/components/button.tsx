import * as React from "react";
import * as classNames from "classnames";
import {Border} from "./border";

export interface ButtonProps {
    active: boolean
    action: () => void
    text?: string
    symbol?: string
}

export class Button extends React.Component<ButtonProps> {

    lastActive = false;

    shouldComponentUpdate(nextProps: Readonly<ButtonProps>): boolean {
        return nextProps.active != this.lastActive;
    }

    render(): React.ReactNode {
        const { active, action, text, symbol } = this.props;
        this.lastActive = active;
        const cls = classNames(
            "gf-button", active && "gf-active", symbol && "gf-symbol"
        );

        return <div className={cls} onClick={!active ? action : undefined}>
            <Border/>
            {text || <span className={"fas fa-" + symbol}/>}
        </div>
    }

}
