import { ConsoleLogger, Injectable, LogLevel } from "@nestjs/common";
//import winston, { createLogger, format, Logger } from "winston";

@Injectable()
export class LoggerService extends ConsoleLogger {
  public static levelNames: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose']
  private levels = {
    error: 0,
    warn: 1,
    log: 2,
    debug: 3,
    verbose: 4
  }
  
  /* protected logger: Logger;

  private setFileTransports () {
    return LoggerService.levelNames.map(levelName => {
      return new winston.transports.File({
        dirname: `${process.env.LOG_PATH}/${levelName}/'`, //path to where save loggin result 
        filename: `${levelName}.log`, //name of file where will be saved logging result
        level: levelName,
        maxsize: +process.env.LOG_SIZE,
      })
    });
  }
 */
  constructor(){
    super();
    /* this.logger = createLogger({
      levels: this.levels,
      level: LoggerService.levelNames[+process.env.LOG_LVL],
      format: format.combine(
        format.timestamp(),
        format.json(),
      ),
      transports: [
        //new winston.transports.Console(),
        ...this.setFileTransports()
      ]
    }); */
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message, optionalParams);
    //this.logger.log(LoggerService.levelNames[this.levels.log], message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, optionalParams);
    //this.logger.log(LoggerService.levelNames[this.levels.error], message, optionalParams);
    //this.logger.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, optionalParams);
    //this.logger.log(LoggerService.levelNames[this.levels.warn], message, optionalParams);
    //this.logger.warn(message, optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, optionalParams);
    //this.logger.log(LoggerService.levelNames[this.levels.debug], message, optionalParams);
    //this.logger.debug(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    super.verbose(message, optionalParams);
    //this.logger.log(LoggerService.levelNames[this.levels.verbose], message, optionalParams);
    //this.logger.verbose(message, optionalParams);
  }
}
