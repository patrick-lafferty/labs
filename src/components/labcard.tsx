import * as React from "react";
const styles = require<any>("./labcard.css");

export interface LabProps {name: string, route: string};

/*
A lab card component is a tile that previews a webapp with a heading and image,
to be added to a grid component
*/
export class LabCard extends React.Component<LabProps, any> {
    render() {
        return (
            <section data-group="lab-card" data-card-route={this.props.route} className={styles.tile}>
                <h1 className={styles.secondaryContent}>{this.props.name}</h1>
                <div className={styles.primaryContent}></div>
            </section>
        );
    }
}