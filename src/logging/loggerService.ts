import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import { FileLogger } from './fileLogger';

@Injectable({ scope: Scope.DEFAULT })
export class LoggerService extends ConsoleLogger {
  constructor() {
    super();
    super.setLogLevels(LoggerService.levelNames);
    this.fileLoggers = this.setFileLoggers();
  }
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

  private writeLog(lvl: number, message: any, ...optionalParams: any[]) {
    if (lvl <= +process.env.LOG_LVL) {
      super[LoggerService._levelNames[lvl]](message, ...optionalParams);
      this.fileLoggers[lvl].write(
        JSON.stringify({ message, ...optionalParams }),
      );
    }
  }

  private readonly fileLoggers: FileLogger[] = this.setFileLoggers();

  log(message: any, ...optionalParams: any[]) {
    this.writeLog(this.levels.log, message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.writeLog(this.levels.error, message, optionalParams);
    super.error(message, optionalParams);
    this.fileLoggers[this.levels.error].write(
      JSON.stringify({ message, ...optionalParams }),
    );
  }

  errorSync(message: any, ...optionalParams: any[]) {
    //super.error(message, ...optionalParams);
    this.fileLoggers[this.levels.error].writeSync(
      JSON.stringify({ message, ...optionalParams }),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    this.writeLog(this.levels.warn, message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.writeLog(this.levels.debug, message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.writeLog(this.levels.verbose, message, optionalParams);
  }
}
