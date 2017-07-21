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
import {LabCard} from "./labcard";
import {Browser} from "./browser";
import {LabViewer} from "./labviewer";

const styles = require<any>("./app.css");

//labs
import {GridLab} from './labs/grid/grid-lab';

/*
A route maps the hash part of a url to a component type to render

eg with www.example.com/#foo 
a route would map #foo to FooComponent which would replace the 
component representing the base www.example.com
*/
interface Route {name: string, component: typeof React.Component};

export interface AppProps {};
export class App extends React.Component<AppProps, any> {
    //all the routes this app supports
    labRoutes: Map<string, Route>; 
    //all of the components we want to show in the grid
    tiles: Array<JSX.Element>;

    /*
    is called whenever window.onpopstate fires, also when
    the app is first mounted
    */
    stateChanged = () => {
        let route = "", hash = window.location.hash;
    
        if (hash.startsWith("#")) {
            route = hash.substr(1);
        }

        this.setState({route: route, previous: "", direct: true});
    };

    /*
    The user might have directly linked a lab, so we need
    to check the url and change state accordingly
    */
    componentDidMount() {
        this.stateChanged();
    }

    constructor(props : AppProps) {
        super(props);
        this.state = {
            route: "", //the current hash we should be rendering
            previous: "",  //the previous hash
            direct: false //true if the user directly navigated to www..../#something, false otherwise
        };

        window.onpopstate = this.stateChanged;

        this.labRoutes = new Map<string, Route>([
            ["Grid", {name: "Grid", component: GridLab}], 
        ]);

        this.tiles = [<LabCard key="Grid" name="Grid" route="Grid" previewImage="./images/grid-card-preview.png"/>];
    }

    click = (e : React.MouseEvent<HTMLDivElement>) => {
        let el = e.target as HTMLElement;
        /*
        Click can be called for many other elements besides the lab cards,
        like a child of a card, or not even a card at all.

        each lab card holds the route to go to it, so if a descendent of
        the card was clicked we need to get the card to get the route
        */
        let labCard = el.closest("section[data-group='lab-card']");

        if (labCard != null) {
            let route = (labCard as HTMLElement).dataset.cardRoute;
            window.history.pushState({}, "", "#" + route);
            this.setState({route: route, previous: "", direct: false});
        }
        /*
        otherwise if the click was on the "Labs >" in the top left corner on 
        the app bar we want to go back*/
        else if ("tabName" in el.dataset && el.dataset.tabName == "Labs >") {

            window.history.pushState({}, "", "");
            this.setState({route: "", previous: this.state.route, direct: false});
        }
    };

    render() {

        let content = null;

        if (this.state.route == "" && this.state.previous == "") {
            content = <Browser offscreen={false} children={this.tiles}/>;
        }
        else {
            let labRoute = "", className = styles.offscreenApp;
            
            if (this.state.route == "") {
                /*
                we went from a lab back to the main screen
                */
                labRoute = this.state.previous;
                className = styles.onscreenApp;
            }
            else {
                /*
                we went from the main screen to a lab
                */
                labRoute = this.state.route;
            }

            if (this.state.direct) {
                className = styles.directOffscreenApp;
            }

            if (this.labRoutes.has(labRoute)) {
                const route = this.labRoutes.get(labRoute);
                /*
                component needs to be capitalized in order to use it in the following statement
                see https://facebook.github.io/react/docs/jsx-in-depth.html#choosing-the-type-at-runtime
                */
                let Component = route!.component;
                let viewer = <LabViewer name={route!.name} lab={<Component />}/>;

                /*
                content will be a flexbox with twice the width of the screen,
                with the browser and viewer both taking up half of it,
                with an animation moving between the two
                */
                content = 
                    <div className={className}> 
                        <Browser offscreen={true} children={this.tiles}/>
                        {viewer}
                    </div>;
            }
        }

        return (
            <div onClick={this.click}>
                {content}
            </div>
        );
    }
}