import * as React from "react";
import {LabCard} from "./labcard";
import {Browser} from "./browser";
import {LabViewer} from "./labviewer";

const styles = require<any>("./app.css");

//labs
import {GridLab} from './labs/grid-lab';

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
            ["Two", {name: "Two", component: GridLab}], 
        ]);

        this.tiles = [
            <LabCard key="Two" name="Two" route="Two"/>,
            <LabCard key="Grid" name="Grid" route="Grid"/>];
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
        else if (el.className.includes("labsBreadcrumb")) {
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
                labRoute = this.state.previous;
                className = styles.onscreenApp;
            }
            else {
                labRoute = this.state.route;
            }

            if (this.state.direct) {
                className = styles.directOffscreenApp;
            }

            if (this.labRoutes.has(labRoute)) {
                const route = this.labRoutes.get(labRoute);
                let Component = route!.component;
                content = <LabViewer name={route!.name} lab={<Component />}/>;
                content = 
                    <div className={className}> 
                        <Browser offscreen={true} children={this.tiles}/>
                        {content}
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