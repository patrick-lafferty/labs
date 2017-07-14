import * as React from "react";
const styles = require<any>("./lab.css");

export interface LabProps {name: string};

export class Lab extends React.Component<LabProps, any> {
    render() {
        return (
            <section className={styles.tile}>
                <h1 className={styles.secondaryContent}>{this.props.name}</h1>
                <div className={styles.primaryContent}></div>
            </section>
        );
    }
}