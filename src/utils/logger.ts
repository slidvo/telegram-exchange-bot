export default class Logger {
  static DEBUG = (msg: string) => console.log(`\x1b[34m DEBUG: ${msg} \x1b[0m`);
}
