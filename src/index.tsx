import * as React from "react";
import * as ReactDOM from "react-dom";

import { Lab } from "./components/lab";
import { Grid } from "./components/grid";

class App extends React.Component<any, any> {
    render() {
        const children = [
            <Lab name="one"/>,
            <Lab name="two"/>,
            <Lab name="three"/>,
            <Lab name="four"/>,
            <Lab name="five"/>
        ];
        return <Grid children={children}/>;
    }
}

ReactDOM.render(<App />,
    document.getElementById("root")
);