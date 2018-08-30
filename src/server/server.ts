import * as Express from "express";
import * as BodyParser from "body-parser";
import { hyrest } from "hyrest-express";
import { component, initialize, inject, TSDI } from "tsdi";
import { allControllers } from "../common";

@component({ eager: true })
export class Server {
    @inject private tsdi: TSDI;

    private app: Express.Application;

    @initialize
    public initialize() {
        this.app = Express();
        this.app.use(BodyParser.json());
        this.app.use(BodyParser.urlencoded({ extended: true }));

        const controllers = allControllers.map(controllerClass => this.tsdi.get(controllerClass));
        this.app.use(hyrest(...controllers));

        this.app.listen(4000);
    }
}
