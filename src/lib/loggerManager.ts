import * as process from "node:process";
import type {ILogger, ILoggerOptions} from "./interfaces";
import {Level} from "./level";
import {Logger} from "./logger";

export class LoggerManager implements ILogger {
    private loggers: Logger[] = new Array<Logger>();

    public constructor(...opts: ILoggerOptions[])
    {
        if (!opts[0]) opts.push(
            {std: process.stdout, level: Level.LOG, colorMode: true},
            {std: process.stderr, level: Level.ERROR, colorMode: true}
        );
        for (const opt of opts) this.loggers.push(new Logger(opt));
    };

    public add(...opts: ILoggerOptions[]): number {
        let size = this.loggers.length;
        for (const opt of opts) size = this.loggers.push(new Logger(opt));
        return size;
    };

    public write(lvl: Level, str?: string, ...data: any) {
        for (const logger of this.loggers) logger.write(lvl, str, ...data);
    };

    public error(message?: any, ...optionalParams: any[]): void {
        this.write(Level.ERROR, message, ...optionalParams);
    };

    public warn(message?: any, ...optionalParams: any[]): void {
        this.write(Level.WARN, message, ...optionalParams);
    };

    public info(message?: any, ...optionalParams: any[]): void {
        this.write(Level.INFO, message, ...optionalParams);
    };

    public log(message?: any, ...optionalParams: any[]): void {
        this.write(Level.LOG, message, ...optionalParams);
    };

    public debug(message?: any, ...optionalParams: any[]): void {
        this.write(Level.DEBUG, message, ...optionalParams);
    };
}