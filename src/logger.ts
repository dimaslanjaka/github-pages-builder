import fs from 'fs';
import path from 'path';
import { writefile } from 'sbg-utility';
import { projectDir } from './init.js';

export const nodeConsole = globalThis.console;

export default class Logger {
  protected debug = false;
  protected logFilePath: string;

  constructor(logFilePath?: string, debug: boolean = false) {
    this.logFilePath = logFilePath ?? path.resolve(projectDir, 'tmp/github-pages-builder.log');
    this.debug = debug;
    // Reset log file at startup
    writefile(this.logFilePath, '');
  }

  setLogFilePath(filePath: string) {
    this.logFilePath = filePath;
    // Reset log file at new path
    writefile(this.logFilePath, '');
  }

  setDebug(value: boolean) {
    this.debug = value;
  }

  log(message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}`;

    if (this.debug) {
      console.log(formattedMessage, ...args);
    }

    fs.appendFileSync(this.logFilePath, formattedMessage + '\n', 'utf8');
  }

  warn(message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] WARN: ${message}`;

    if (this.debug) {
      console.warn(formattedMessage, ...args);
    }

    fs.appendFileSync(this.logFilePath, formattedMessage + '\n', 'utf8');
  }

  error(message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ERROR: ${message}`;

    if (this.debug) {
      console.error(formattedMessage, ...args);
    }

    fs.appendFileSync(this.logFilePath, formattedMessage + '\n', 'utf8');
  }
}
