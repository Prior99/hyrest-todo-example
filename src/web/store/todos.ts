import { component, inject, initialize } from "tsdi";
import { observable, action, computed } from "mobx";
import { Store } from "hyrest-mobx";
import { Todo, TodosController } from "../../common";

@component
export class TodosStore extends Store(TodosController){
    @inject protected controller: TodosController;

    @initialize
    protected async initialize() {
        await this.list();
    }

    @action.bound public async check(id: string) {
        return await this.update(id, { checked: !this.byId(id).checked });
    }
}
