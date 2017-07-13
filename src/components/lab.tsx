import * as React from "react";
//const styles = require<any>("./lab.css");

export interface LabProps {name: string};

export class Lab extends React.Component<LabProps, any> {
    render() {
        return (
            <h1>{this.props.name}</h1>
        );
    }
}