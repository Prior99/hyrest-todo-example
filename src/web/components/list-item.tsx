import * as React from "react";
import { external, inject } from "tsdi";
import { observer } from "mobx-react";
import { computed, action } from "mobx";
import { TodosStore } from "../store";

@external @observer
export class ListItem extends React.Component<{ id: string }> {
    @inject private todos: TodosStore;

    @computed private get todo() { return this.todos.byId(this.props.id); }

    @computed private get style() {
        return {
            textDecoration: this.todo.checked ? "line-through" : undefined,
            color: this.todo.checked ? "#eee" : undefined,
        };
    }

    @action.bound private async handleDelete() { await this.todos.delete(this.todo.id); }

    @action.bound private async handleCheck() { await this.todos.check(this.todo.id); }

    public render() {
        return (
            <li style={this.style}>
                <b>{this.todo.name}:</b> {this.todo.description}
                <button onClick={this.handleDelete}>Delete</button>
                <button onClick={this.handleCheck}>Check</button>
            </li>
        );
    }
}
