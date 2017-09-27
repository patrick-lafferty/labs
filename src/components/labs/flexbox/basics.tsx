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
const styles = require<any>("./basics.css");

export class Basics extends React.Component<any, any> {
    render() {
        return (
            <section className={styles.tabContent}>
                <p className={styles.noMargin}>This is a basic flexbox example with various coloured divs. 
                    The blue has a flex-grow value of 3, the green div has a fixed width of
                    10rem, the red div has a flex-grow value of 2, and the 
                    remaining divs are all flex-grow 1. 
                </p>

                <div className={styles.demoFlexbox}>
                    <div className={styles.tile0}></div>
                    <div className={styles.tile1}></div>
                    <div className={styles.tile2}></div>
                    <div className={styles.tile3}></div>
                    <div className={styles.tile4}></div>
                    <div className={styles.tile5}></div>
                </div>
            </section>
        );
    }
}