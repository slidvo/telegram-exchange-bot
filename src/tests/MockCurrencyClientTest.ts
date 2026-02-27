import { MockCurrencyClient } from "../clients/MockCurrencyClient.js";
import assert from "node:assert";

export async function getLatestRatesTest_shouldReturnBaseEUR() {
  const mockCurrencyClient = new MockCurrencyClient();
  const latestRates = await mockCurrencyClient.getLatestRates("EUR");
  assert(latestRates.base === "EUR", "Currency should be EUR");
  console.log(
    "getLatestRatesTest_shouldReturnBaseEUR:\x1b[32m success  \x1b[0m",
  );
}
