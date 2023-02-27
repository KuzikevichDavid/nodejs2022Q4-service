import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { FileLogger } from './fileLogger';

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

  private setFileLoggers() {
    return LoggerService.levelNames.map((levelName) => {
      const logger = new FileLogger(
        `${process.env.LOG_PATH}/${levelName}/`, //path to where save loggin result
        levelName, //name of file where will be saved logging result
        +process.env.LOG_SIZE * 1000, // filesize
      );
      return logger;
    });
  }

  private readonly fileLoggers: FileLogger[] = this.setFileLoggers();

  constructor() {
    super();
    super.setLogLevels(LoggerService.levelNames);
    this.fileLoggers = this.setFileLoggers();
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message, optionalParams);
    this.fileLoggers[this.levels.log].write(
      JSON.stringify({ message, ...optionalParams }),
    );
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, optionalParams);
    this.fileLoggers[this.levels.error].write(
      JSON.stringify({ message, ...optionalParams }),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, optionalParams);
    this.fileLoggers[this.levels.warn].write(
      JSON.stringify({ message, ...optionalParams }),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, optionalParams);
    this.fileLoggers[this.levels.debug].write(
      JSON.stringify({ message, ...optionalParams }),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, optionalParams);
    this.fileLoggers[this.levels.verbose].write(
      JSON.stringify({ message, ...optionalParams }),
    );
  }
}
