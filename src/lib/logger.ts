import process from 'node:process';
import type {Writable} from 'node:stream';
import * as util from 'node:util';
import Color from './color';
import {Level, Levels} from './level';

// Custom Writable interface adding isTTY to every writable stream given to the logger
export interface CWritable extends Writable {
	isTTY?: boolean;
}

export interface LoggerOptions {
	colorMode?: boolean;
	level?: Level;
	strictMode?: boolean;
}

const endl = (process.platform === "win32")?"\r\n":"\n"

export class Logger {
	private readonly std: CWritable;

	private readonly level: Level;

	private readonly color: boolean;

	private indent: number = 0;

	public constructor(std: Writable = process.stdout, opts?: LoggerOptions)
	{
		this.std = std;
		this.level = opts?.level ? opts.level : Level.LOG;
		this.color = opts?.colorMode ? opts.colorMode : false;
	}

	private _time(): string {
		return new Date().toISOString().replace('T', ' ').replace(/\..+/, '');
	}

	public write(lvl: Level, str: string, ...data: any): void {
		if (this.level < lvl) return; // if the level of the logger is less than the content one, we should not print anything

		const arr = ["[", this._time(), "] [", "] ", util.format(str, ...data), endl];

		for (let iter = 0; iter < this.indent; iter++) arr[3] += "  ";

		if (this.color) {
			arr.splice(3, 0, Levels[lvl].color, Levels[lvl].name, Color.RESET);
			arr.splice(-2,0, Levels[lvl].color);
			arr.splice(-1,0, Color.RESET);
		}

		this.std.write(arr.join(""));
	};

	public error(message?: any, ...optionalParams: any[]): void {
		this.write(Level.ERR, message, ...optionalParams);
	}

	public warn(message?: any, ...optionalParams: any[]): void {
		this.write(Level.WARN, message, ...optionalParams);
	}

	public info(message?: any, ...optionalParams: any[]): void {
		this.write(Level.INFO, message, ...optionalParams);
	}

	public log(message?: any, ...optionalParams: any[]): void {
		this.write(Level.LOG, message, ...optionalParams);
	}

	public debug(message?: any, ...optionalParams: any[]): void {
		this.write(Level.DEBUG, message, ...optionalParams);
	}

	public assert(value?: any, message?: string, ...optionalParams: any[]): void {
		if (!value)
			this.write(
				Level.WARN,
				message ? 'Assertion failed: ' + message : 'Assertion failed',
				...optionalParams,
			);
	}

	public clear(): void {
		throw new Error('Method not implemented.');
	}

	public dir(obj: any, options?: util.InspectOptions): void {
		this.log(util.inspect(obj, options));
	}

	public dirxml(...data: any[]): void {
		this.log(data);
	}

	public group(...label: any[]): void {
		this.log(...label);
		this.indent += 1;
	}

	public groupEnd(): void {
		this.indent -= 1;
	}
}