import { getPipValue } from "../utils/pipValues";

interface TradeInput {
  pair: string;
  entry: number;
  tp: number;
  sl: number;
  result: "TP" | "SL" | "BE";
  lot_size: number;
}

export const calculateTradingMetrics = ({
  pair,
  entry,
  tp,
  sl,
  result,
  lot_size,
}: TradeInput) => {
  const pipFactor = pair.includes("JPY") ? 100 : 10000;

  const pipsProfit = Math.abs(tp - entry) * pipFactor;
  const pipsStop = Math.abs(entry - sl) * pipFactor;
  const riskRewardRatio = pipsStop === 0 ? 0 : parseFloat((pipsProfit / pipsStop).toFixed(2));

  const pipValuePerLot = getPipValue(pair);
  const pipValueTotal = parseFloat((pipValuePerLot * lot_size).toFixed(2));

  let profit = 0;
  if (result === "TP") profit = pipsProfit * pipValueTotal;
  else if (result === "SL") profit = -pipsStop * pipValueTotal;

  return {
    pipsProfit: parseFloat(pipsProfit.toFixed(2)),
    pipsStop: parseFloat(pipsStop.toFixed(2)),
    riskRewardRatio,
    pipValueTotal,
    profit: parseFloat(profit.toFixed(2)),
  };
};