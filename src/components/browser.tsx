import * as React from "react";
import {AppBar} from "./appbar";
import { Grid } from "./grid";

export class Browser extends React.Component<any, any> {
    render() {
        return (
            <div>
                <AppBar />
                <Grid children={this.props.children}/>
            </div>
        );
    }
}