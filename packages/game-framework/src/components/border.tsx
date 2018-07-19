import * as React from "react";

export class Border extends React.Component {

    render() {
        return <div className="gf-border">
            {this.props.children}
        </div>
    }

}
