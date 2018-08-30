import * as React from "react";
import { external, inject } from "tsdi";
import { observer } from "mobx-react";
import { action } from "mobx";
import { field, Field, hasFields } from "hyrest-mobx";
import { Todo } from "../../common";
import { TodosStore } from "../store";

@external @observer @hasFields()
export class Form extends React.Component {
    @inject private todos: TodosStore;

    @field(Todo) private todo: Field<Todo>;

    @action.bound private async handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        await this.todos.create(this.todo.value);
    }

    public render() {
        const { name, description } = this.todo.nested;
        return (
            <form onSubmit={this.handleSubmit}>
                <p>
                    <label>
                        Name:
                        <input {...name.reactInput} />
                    </label>
                </p>
                { name.invalid && <p style={{ color: "red" }}>{name.error}</p> }
                <p>
                    <label>
                        Description:
                        <input {...description.reactInput} />
                    </label>
                </p>
                { description.invalid && <p style={{ color: "red" }}>{description.error}</p> }
                <p>
                    <input disabled={this.todo.invalid} type="submit" value="Create" />
                </p>
            </form>
        );
    }
}
