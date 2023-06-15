//import chalk from 'chalk';

export class Paint {
  private constructor() {}

  static success(message: string) {
    return message; //chalk.greenBright(message);
  }
  static warning(message: string) {
    return message; //chalk.yellowBright(message);
  }
  static info(message: string) {
    return message; //chalk.blueBright(message);
  }
  static error(message: string) {
    return message; //chalk.red(message);
  }
}
