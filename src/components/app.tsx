import * as React from "react";
import {LabCard} from "./labcard";
import {Browser} from "./browser";
import {LabViewer} from "./labviewer";

//labs
import {GridLab} from './labs/grid-lab';
export interface AppProps {};
interface Route {name: string, component: typeof React.Component};
export class App extends React.Component<AppProps, any> {
    labRoutes: Map<string, Route>;
    labs: Array<JSX.Element>;

    constructor(props : AppProps) {
        super(props);
        this.state = {route: ""};
        
        window.onpopstate = () => {
            this.setState({route: window.location.hash});
        };

        this.labRoutes = new Map<string, Route>([
            ["Grid", {name: "Grid", component: GridLab}], 
        ]);

        this.labs = [
            <LabCard key="Grid" name="Grid" route="Grid"/>];
    }

    click = (e : React.MouseEvent<HTMLDivElement>) => {
        let el = e.target as HTMLElement;
        let labCard = el.closest("section[data-group='lab-card']");

        if (labCard != null) {
            let route = (labCard as HTMLElement).dataset.cardRoute;
            window.history.pushState({}, "", "#" + route);
            this.setState({route: route});
        }
    };

    render() {

        let content = null;

        if (this.state.route == "") {
            content = <Browser children={this.labs}/>;
        }
        else if (this.labRoutes.has(this.state.route)) {
            const route = this.labRoutes.get(this.state.route);
            let Component = route!.component;
            content = <LabViewer name={route!.name} lab={<Component />}/>;
        }

        return (
            <div onClick={this.click}>
                {content}
            </div>
        );
    }
}