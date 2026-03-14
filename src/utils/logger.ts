export default class Logger {
  static DEBUG = (msg: string) =>
    console.log(`\x1b[34m [${new Date().toISOString()}] DEBUG: ${msg} \x1b[0m`);
  static ERROR = (msg: string) =>
    console.log(`\x1b[31m [${new Date().toISOString()}] ERROR: ${msg} \x1b[0m`);
}
