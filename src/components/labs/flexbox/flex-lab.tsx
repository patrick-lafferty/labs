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
import {TabControl} from "../../common/tabcontrol";
import {Intro} from "./intro";
import {Basics} from "./basics";
/*import {Areas} from "./areas";
import {References} from "./references";*/

const styles = require<any>("../lab.css");

/*
The FlexLab demonstrates different properties and uses of CSS Flexbox
*/
export class FlexLab extends React.Component<any, any>  {

    constructor(props: any) {
        super(props); 

        this.state = {
            contents: new Map<string, JSX.Element>([
                ["Intro", <Intro />],
                ["Basics", <Basics />],
                /*["Areas", <Areas />],
                ["References", <References />]*/
            ])
        };
    }
    
    render() {

        return (
            <article className={styles.lab}>
                <TabControl contents={this.state.contents}/>
            </article>
        );
    }
}