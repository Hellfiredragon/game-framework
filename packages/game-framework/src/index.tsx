import * as React from "react";

export namespace X {
    export const X = 15;
}

export class ItWorks extends React.Component {

    render() {
        return <h1>It Works, {X.X + 3}!</h1>
    }

}
