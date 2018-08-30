import * as React from "react";
import * as ReactDOM from "react-dom";
import { TSDI } from "tsdi";
import { configureController } from "hyrest";
import { allControllers } from "../common";
import { List, Form } from "./components";

configureController(allControllers, { baseUrl: "http://localhost:4000" });

const tsdi = new TSDI();
tsdi.enableComponentScanner();

ReactDOM.render(
    <div>
        <h1>Todo List</h1>
        <List />
        <h1>Create Todo</h1>
        <Form />
    </div>,
    document.getElementById("root"),
);
