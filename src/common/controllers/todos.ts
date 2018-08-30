import { Connection } from "typeorm";
import { controller, route, body, param, created, ok, notFound } from "hyrest";
import { component, inject } from "tsdi";
import { Todo } from "../models";
import { createTodo, updateTodo, world } from "../scopes";

@controller @component
export class TodosController {
    @inject private db: Connection;

    @route("POST", "/todos").dump(Todo, world)
    public async create(@body(createTodo) todo: Todo): Promise<Todo> {
        return created(await this.db.getRepository(Todo).save(todo));
    }

    @route("GET", "/todos").dump(Todo, world)
    public async list(): Promise<Todo[]> {
        const todos = await this.db.getRepository(Todo).createQueryBuilder("todo")
            .where("todo.deleted is NULL")
            .orderBy("todo.created", "DESC")
            .getMany();
        return ok(todos);
    }

    @route("DELETE", "/todo/:id")
    public async delete(@param("id") id: string): Promise<void> {
        if (!await this.db.getRepository(Todo).findOne(id)) {
            return notFound<void>("No such todo.");
        }
        await this.db.getRepository(Todo).update(id, { deleted: new Date() });
        return ok();
    }

    @route("GET", "/todo/:id").dump(Todo, world)
    public async get(@param("id") id: string): Promise<Todo> {
        const todo = await this.db.getRepository(Todo).findOne(id);
        if (!todo) {
            return notFound<Todo>("No such todo.");
        }
        return ok(todo);
    }

    @route("POST", "/todo/:id").dump(Todo, world)
    public async update(@param("id") id: string, @body(updateTodo) patch: Todo): Promise<Todo> {
        const todo = await this.db.getRepository(Todo).findOne(id);
        if (!todo) {
            return notFound<Todo>("No such todo.");
        }
        await this.db.getRepository(Todo).update(id, patch);
        return ok(await this.get(id));
    }
}
