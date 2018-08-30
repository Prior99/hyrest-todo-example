import { controller, route, body, param } from "hyrest";
import { Todo } from "../models";
import { createTodo, updateTodo } from "../scopes";

@controller
export class TodosController {
    @route("POST", "/todos")
    public async create(@body(createTodo) todo: Todo): Promise<Todo> {
        return;
    }

    @route("GET", "/todos")
    public async list(): Promise<Todo[]> {
        return;
    }

    @route("DELETE", "/todo/:id")
    public async delete(@param("id") id: string): Promise<void> {
        return;
    }

    @route("GET", "/todo/:id")
    public async get(@param("id") id: string): Promise<Todo> {
        return;
    }

    @route("POST", "/todo/:id")
    public async update(@param("id") id: string, @body(updateTodo) patch: Todo): Promise<Todo> {
        return;
    }
}
