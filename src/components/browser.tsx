import * as React from "react";
import {AppBar} from "./appbar";
import { Grid } from "./grid";

const styles = require<any>("./browser.css");
export interface BrowserProps {offscreen: boolean, children: JSX.Element[]};
export class Browser extends React.Component<BrowserProps, any> {
    render() {

        return (
            <div className={styles.browser}> 
                <AppBar />
                <Grid children={this.props.children}/>
            </div>
        );
    }
}