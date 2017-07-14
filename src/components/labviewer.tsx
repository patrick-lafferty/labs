import * as React from "react";
import {LabBar} from "./labbar";

export interface LabProps {name: string, lab: JSX.Element};
export class LabViewer extends React.Component<LabProps, any> {
    render() {
        return (
            <div>
                <LabBar name={this.props.name}/>
                {this.props.lab}
            </div>
        )
    }
}