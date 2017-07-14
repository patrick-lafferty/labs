import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./components/app";

require<any>("./styles/colours.css");
require<any>("./styles/body.css");

ReactDOM.render(<App />,
    document.getElementById("root")
);