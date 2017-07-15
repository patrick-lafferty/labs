/*
MIT License
Copyright (c) 2017 Patrick Lafferty
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import * as React from "react";
import {Button} from "./common/button";
const styles = require<any>("./labbar.css");

export interface LabBarProps {name: string};

/*
LabBar represents the top app bar with the lab's name and 
a button "Lab >" that goes back to the main screen
*/

export class LabBar extends React.Component<LabBarProps, any> {
    //<button className={styles.labsBreadcrumb}>Labs ></button>
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.toolbar}>
                    <Button name="Labs >" />
                    <h1 className={styles.name}>{this.props.name} Lab</h1>
                </div>
            </header>
        );
    }
}