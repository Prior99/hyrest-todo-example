import * as React from "react";
import { external, inject } from "tsdi";
import { observer } from "mobx-react";
import { TodosStore } from "../store";
import { ListItem } from "./list-item";

@external @observer
export class List extends React.Component {
    @inject private todos: TodosStore;

    public render() {
        return (
            <ul>
                {this.todos.all.map(({ id }) => <ListItem id={id} key={id} />)}
            </ul>
        );
    }
}
