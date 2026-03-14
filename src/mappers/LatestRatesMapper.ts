import type LatestRates from "../dto/LatestRates.js";
import { MissingBaseCurrencyError } from "../errors/MissingBaseCurrencyError.js";
import { MissingDateError } from "../errors/MissingDateError.js";
import { MissingRatesError } from "../errors/MissingratesError.js";
import log from "../utils/logger.js";

export function toLatestRates(json: unknown): LatestRates {
  if (!json || typeof json !== "object") {
    throw new Error(`Invalid JSON LatestRates.json`);
  }

  const data = json as LatestRates;

  if (!data.base) {
    throw new MissingBaseCurrencyError();
  }
  if (!data.date) {
    throw new MissingDateError();
  }
  if (!data.rates) {
    throw new MissingRatesError();
  }

  return {
    base: data.base,
    date: new Date(data.date),
    rates: data.rates,
  };
}
