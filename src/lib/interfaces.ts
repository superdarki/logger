// Custom Writable interface adding isTTY to every writable stream given to the logger
import type {Writable} from "node:stream";
import type {Level} from "./level";

export interface IWritable extends Writable {
    isTTY?: boolean;
}

export interface ILoggerOptions {
    colorMode?: boolean;
    level?: Level;
    std?: IWritable;
}

export interface ILoggerMethod {
    (msg: string, ...args: any[]): void
    (obj: object, msg?: string, ...args: any[]): void
}

export interface ILogger {
    debug: ILoggerMethod
    error: ILoggerMethod,
    info: ILoggerMethod,
    log: ILoggerMethod,
    warn: ILoggerMethod
}
