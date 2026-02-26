import type LatestRates from "../dto/LatestRates.js";

export function toLatestRates(json: unknown): LatestRates {
  const data = json as any;
  // TODO: add checks data.base data.date, data.rates should be exists
  return {
    base: data.base,
    date: new Date(data.date),
    rates: data.rates,
  };
}
