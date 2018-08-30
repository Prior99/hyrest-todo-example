import * as React from "react";
import * as ReactDOM from "react-dom";
import { TSDI } from "tsdi";
import { configureController } from "hyrest";
import { allControllers } from "../common";

configureController(allControllers, { baseUrl: "http://localhost:4000" });

const tsdi = new TSDI();
tsdi.enableComponentScanner();

ReactDOM.render(
    <div>
        Hello, world.
    </div>,
    document.getElementById("root"),
);
