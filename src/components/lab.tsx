import * as React from "react";
const styles = require<any>("./lab.css");

export interface LabProps {name: string};

/*
A lab component is a tile that previews a webapp with a heading and image,
to be added to a grid component
*/
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