export class MissingBaseCurrencyError extends Error {
  constructor() {
    super("Missing base currency");
  }
}
