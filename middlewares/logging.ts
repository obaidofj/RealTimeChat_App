// @ts-nocheck
// to be able to deploy successfully to ecs and ec2
import chalk from 'chalk';
import winston from 'winston';

const myLevels = {
  levels: {
    info: 1,
    error: 2
  },
  colors: {
    info: 'green',
    error: 'red'
  }
};


const colorizer = winston.format.colorize();

const customFormat = winston.format.combine(
  winston.format.printf(({ level, message, project, ...meta }) => {
    let coloredOutput = message;
    if (level === 'info') {
      coloredOutput = chalk.cyanBright(` [${level}] [${project}] ${message} ${JSON.stringify(meta)}`);
    } else if (level === 'error') {
      coloredOutput = chalk.red(` [${level}] [${project}] ${message} ${JSON.stringify(meta)}`);
    }
    else
      coloredOutput = chalk.blue(` [${level}] [${project}] ${message} ${JSON.stringify(meta)}`);
    return coloredOutput;
  })
);




const winsLogger = winston.createLogger({
  levels: myLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.json()
  ),
  defaultMeta: { project: 'RealTimeChatApp' },
  transports: [
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/all.log' }),
    new winston.transports.Console({ format: winston.format.combine(customFormat) }),
  ],
});

export default winsLogger;
