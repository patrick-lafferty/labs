import * as React from "react";
import { Lab } from "./lab";
import { Grid } from "./grid";
const styles = require<any>("./app.css");

export class App extends React.Component<any, any> {
    render() {
        const children = [
            <Lab name="One"/>,
            <Lab name="Two"/>,
            <Lab name="Three"/>,
            <Lab name="Four"/>,
            <Lab name="Five"/>
        ];
        return (
            <div>
                <div className={styles.toolbar}>
                    <h1 className={styles.name}>Web Tech Labs</h1>
                </div>
                <Grid children={children}/>
            </div>
        );
    }
}