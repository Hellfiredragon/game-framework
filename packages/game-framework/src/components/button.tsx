import * as React from "react";
import * as classNames from "classnames";

export type ButtonState = "active" | "normal" | "disabled" | undefined;

export interface Props {
    state?: ButtonState;
    action: () => void;
    text?: string;
    icon?: string;
    hint?: string;
}

export class Button extends React.PureComponent<Props> {

    render(): React.ReactNode {
        const { state, action, icon, text, hint } = this.props;
        const myState: ButtonState = state || "normal";

        const cls = classNames(
            "gf-button",
            "gf-" + myState,
            icon && "gf-" + icon,
            icon && "gf-icon"
        );

        return <div className={cls} onClick={myState == "normal" ? action : undefined}>
            {text || <span className={"fas fa-" + icon}/>}
            {hint && <span className="hint">{hint}</span> }
        </div>
    }

}
