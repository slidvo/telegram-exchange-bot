export class InvalidDataFormatError extends Error {
  constructor(message: string = "Invalid data format") {
    super(message);
    this.name = "InvalidDataFormatError";
  }
}
