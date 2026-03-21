export class InvalidCurrencyCodeError extends Error {
  constructor(message: string = "Invalid currency code") {
    super(message);
    this.name = "IvalidCurrencyCodeError";
  }
}
