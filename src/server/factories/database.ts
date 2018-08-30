import { component, factory, initialize } from "tsdi";
import { Connection, createConnection } from "typeorm";
import { allModels } from "../../common";

@component({ eager: true })
export class DatabaseFactory {
    private connection: Connection;

    @initialize
    private async initialize() {
        this.connection = await createConnection({
            database: "todos",
            entities: allModels,
            type: "postgres",
            synchronize: true,
            logging: true,
        });
    }


    @factory
    public getConnection(): Connection {
        return this.connection;
    }
}
