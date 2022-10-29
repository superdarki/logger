import Color from './color';

export enum Level {
	ERR = 1,
	WARN = 2,
	INFO = 3,
	LOG = 4,
	DEBUG = 5
}

export const Levels = {
	1: { name: 'ERROR', color: Color.RED },
	2: { name: 'WARN', color: Color.YELLOW },
	3: { name: 'INFO', color: Color.GREEN },
	4: { name: 'LOG', color: Color.WHITE },
	5: { name: 'DEBUG', color: Color.CYAN }
}