import fs from 'fs';
import path from 'path';
import { writefile } from 'sbg-utility';
import { projectDir } from './init.js';

export const nodeConsole = globalThis.console;

export default class Logger {
  protected static debug = false;
  protected static logFilePath: string = path.resolve(projectDir, 'tmp/github-pages-builder.log');

  static setLogFilePath(filePath: string) {
    Logger.logFilePath = filePath;
    // Reset log file at new path
    writefile(Logger.logFilePath, '');
  }

  static setDebug(value: boolean) {
    Logger.debug = value;
  }

  static log(message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ${message}`;

    if (Logger.debug) {
      console.log(formattedMessage, ...args);
    }

    fs.appendFileSync(Logger.logFilePath, formattedMessage + '\n', 'utf8');
  }

  static warn(message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] WARN: ${message}`;

    if (Logger.debug) {
      console.warn(formattedMessage, ...args);
    }

    fs.appendFileSync(Logger.logFilePath, formattedMessage + '\n', 'utf8');
  }

  static error(message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const formattedMessage = `[${timestamp}] ERROR: ${message}`;

    if (Logger.debug) {
      console.error(formattedMessage, ...args);
    }

    fs.appendFileSync(Logger.logFilePath, formattedMessage + '\n', 'utf8');
  }

  // Reset log file at startup
  static {
    writefile(Logger.logFilePath, '');
  }
}
