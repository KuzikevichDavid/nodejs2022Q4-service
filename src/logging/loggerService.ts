import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService extends ConsoleLogger {
  private static _levelNames: LogLevel[] = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
  ];

  public static get levelNames(): LogLevel[] {
    return LoggerService._levelNames.slice(0, +process.env.LOG_LVL + 1);
  }

  private levels = {
    error: 0,
    warn: 1,
    log: 2,
    debug: 3,
    verbose: 4,
  };

  protected fileLogger: winston.Logger;

  private setFileTransports() {
    return LoggerService.levelNames.map((levelName) => {
      return new winston.transports.File({
        dirname: `${process.env.LOG_PATH}/${levelName}/`, //path to where save loggin result
        filename: `${levelName}.log`, //name of file where will be saved logging result
        level: levelName,
        maxsize: +process.env.LOG_SIZE * 1000,
      });
    });
  }

  constructor() {
    super();
    super.setLogLevels(LoggerService.levelNames);
    this.fileLogger = winston.createLogger({
      levels: this.levels,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [...this.setFileTransports()],
    });
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message, optionalParams);
    this.fileLogger.log(
      LoggerService.levelNames[this.levels.log],
      message,
      optionalParams,
    );
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, optionalParams);
    this.fileLogger.log(
      LoggerService.levelNames[this.levels.error],
      message,
      optionalParams,
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, optionalParams);
    this.fileLogger.log(
      LoggerService.levelNames[this.levels.warn],
      message,
      optionalParams,
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, optionalParams);
    this.fileLogger.log(
      LoggerService.levelNames[this.levels.debug],
      message,
      optionalParams,
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, optionalParams);
    this.fileLogger.log(
      LoggerService.levelNames[this.levels.verbose],
      message,
      optionalParams,
    );
  }
}
