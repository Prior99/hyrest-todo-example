import { TSDI } from "tsdi";
import "./server";
import "./factories";

const tsdi = new TSDI();
tsdi.enableComponentScanner();
