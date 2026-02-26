export default interface LatestRates {
  base: string;
  date: Date;
  rates: Record<string, number>;
}
