import * as React from "react";
import {LabBar} from "./labbar";

const styles = require<any>("./labviewer.css");
export interface LabProps {name: string, lab: JSX.Element};
export class LabViewer extends React.Component<LabProps, any> {
    render() {
        return (
            <div className={styles.labViewer}>
                <LabBar name={this.props.name}/>
                {this.props.lab}
            </div>
        )
    }
}