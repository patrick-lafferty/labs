import * as React from "react";
const styles = require<any>("./button.css");

export interface ButtonProps {name: string};
export class Button extends React.Component<ButtonProps, any> {
    constructor(props: ButtonProps) {
        super(props);

        this.state = {
            clicked: false
        };
    }

    mouseDown = () => {
        this.setState({clicked: true});
    };

    animationEnd = () => {
        this.setState({clicked: false});
    };

    render() {
        let className = "";

        if (this.state.clicked) {
            className = styles.clickedButton;
        }
        else {
            className = styles.button;
        }

        return (
            <button onMouseDown={this.mouseDown}
                    onAnimationEnd={this.animationEnd}
                    className={className}
                    data-tab-name={this.props.name}>
                {this.props.name}
            </button>
        );     
    }
}
