import { createScope } from "hyrest";

export const world = createScope();
export const createTodo = createScope();
export const updateTodo = createScope().include(createTodo);
