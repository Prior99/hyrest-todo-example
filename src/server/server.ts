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
        this.app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            if (req.method === "OPTIONS") {
                res.sendStatus(200);
                return;
            }
            return next();
        });

        const controllers = allControllers.map(controllerClass => this.tsdi.get(controllerClass));
        this.app.use(hyrest(...controllers));

        this.app.listen(4000);
    }
}
