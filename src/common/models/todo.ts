import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { is, specify, length, uuid, scope } from "hyrest";
import { createTodo, updateTodo, world } from "../scopes";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn("uuid")
    @is().validate(uuid) @scope(world)
    public id?: string;

    @Column("varchar", { length: 128 })
    @is().validate(length(0, 128)) @scope(world, createTodo)
    public name?: string;

    @Column("text")
    @is() @scope(world, createTodo)
    public description?: string;

    @CreateDateColumn()
    @is() @specify(() => Date) @scope(world)
    public created?: Date;

    @Column("bool", { default: false })
    @is() @scope(world, updateTodo)
    public checked?: boolean;

    @Column("timestamp without time zone", { nullable: true })
    @is() @specify(() => Date) @scope(world)
    public deleted?: Date;
}
